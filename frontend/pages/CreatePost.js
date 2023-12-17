import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { Row, Col, Container } from "react-bootstrap";
import "../styles/CreatePost.css";
import Breadcrumb from "../components/Breadcrumb";
import PageTitle from "../components/PageTitle";
import ImageInput from "../components/ImageInput";
import FormInput from "../components/FormInput";
import SelectInput from "../components/SelectInput";
import RadioInput from "../components/RadioInput";
import TextAreaInput from "../components/TextAreaInput";
import QuestionInput from "../components/QuestionInput";
import Modal from "../components/Modal";
import SubmitButton from "../components/SubmitButton";
import GoBackButton from "../components/GoBackButton";
import InputValidation from "../components/InputValidation";
import CheckLogin from "../components/CheckLogin";

// Initial value of each form field for formValues
const initialFormValues = {
  image: null,
  file: null,
  fileName: "ยังไม่ได้เลือกไฟล์",
  postTitle: "",
  petType: "1",
  petGender: "M",
  petBreed: "",
  petDOB: "",
  petVaccinated: "NS",
  petSterilized: "NS",
  petWean: "NS",
  petHouseBreaking: "NS",
  petDetail: "",
  questionList: [{ question: "" }],
};

// CreatePost components renders a page to create new post
const CreatePost = () => {
  const [formValues, setFormValues] = useState(initialFormValues); // state to store form data
  const [validationErrors, setValidationErrors] = useState({}); // state to store validation errors
  const [isModalOpen, setIsModalOpen] = useState(false); // state to handle modal visibility

  const [user, setUser] = useState(null); //state to store user data
  const [loadingUser, setLoadingUser] = useState(true); //state to handle user loading status

  const successTitle = "สร้างประกาศตามหาบ้านแล้ว"; // title for ConfirmSucess page
  const navigate = useNavigate();

  // fetch user data and navigate to login if not logged in
  useEffect(() => {
    const fetchData = async () => {
      try {
        // use CheckLogin component to check if the user is logged in and fetch user data
        const result = await CheckLogin();

        // navigate to login page if the user is not logged in
        if (!result) {
          return navigate("/Login", { state: "3" });
        }

        // set fetched user data
        setUser(result.userData);
      } catch (error) {
        console.error("Error getting user information:", error);
      } finally {
        // set loading state to false
        setLoadingUser(false);
      }
    };

    fetchData();
  }, [navigate]);

  // conditional rendering based on loading and user status
  if (!loadingUser && !user) {
    console.log("User not logged in");
    return navigate("/Login", { state: "3" }); // redirect to login page if the user is not logged in
  }

  // function to handle form input change events
  const handleChange = (event) => {
    // update the form values and reset validation errors of that field
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
    setValidationErrors({ ...validationErrors, [name]: "" });
  };

  // funtion to handle for file input change
  const handleFileChange = (event) => {
    // update the form values (file, fileName and image) and reset validation errors of image field
    const file = event.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setFormValues({
        ...formValues,
        fileName: file.name,
        image: imageURL,
        file: file,
      });
      setValidationErrors({ ...validationErrors, image: "" });
    }
    event.target.value = "";
  };

  // function to reset file input
  const handleFileReset = () => {
    // reset the form values (file, fileName and image) and validation errors of image field
    setFormValues({
      ...formValues,
      fileName: "ยังไม่ได้เลือกไฟล์",
      image: null,
      file: null,
    });
  };

  // function to handle for adding new question
  const handleQuestionAdd = () => {
    // add new question to question list
    setFormValues({
      ...formValues,
      questionList: [...formValues.questionList, { question: "" }],
    });
  };

  // function to handle for deleting question
  const handleQuestionDelete = (index) => {
    // delete question at specified index in question list
    const updatedQuestionList = [...formValues.questionList];
    updatedQuestionList.splice(index, 1);
    setFormValues({
      ...formValues,
      questionList: updatedQuestionList,
    });

    // if deleted question have caused any error before, delete validation errors of that index
    if (validationErrors && validationErrors.questions) {
      const updatedQuestionErrors = [...validationErrors.questions];
      updatedQuestionErrors.splice(index, 1);
      setValidationErrors({
        ...validationErrors,
        questions: updatedQuestionErrors,
      });
    }
  };

  // function to handle input changes in question input
  const handleQuestionChange = (event, index) => {
    // update the form values (question)
    const { name, value } = event.target;
    const updatedQuestionList = [...formValues.questionList];
    updatedQuestionList[index][name] = value;
    setFormValues({
      ...formValues,
      questionList: updatedQuestionList,
    });

    // if changed question have caused any error before, reset validation errors of that index
    if (validationErrors && validationErrors.questions) {
      const updatedQuestionErrors = [...validationErrors.questions];
      updatedQuestionErrors[index] = "";
      setValidationErrors({
        ...validationErrors,
        questions: updatedQuestionErrors,
      });
    }
  };

  // function to handle form submission
  const handleSubmit = (event) => {
    // prevent default form submission
    event.preventDefault();

    // validate form inputs and set errors
    const errors = InputValidation(formValues);
    setValidationErrors(errors);

    // if form input is valid, open modal for confirmation
    const isValid = Object.keys(errors).length === 0;
    if (isValid) {
      setIsModalOpen(true);
    }
  };

  // function to handle closing the modal
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  // function to handle confirm creating post
  const handleConfirm = () => {
    // prepare form data for submission using Axios POST request
    const formData = new FormData();

    // append form values to formData
    const keys = Object.keys(formValues);
    keys.forEach((key) => {
      const value = formValues[key];
      if (key === "questionList") {
        const questionListJSON = JSON.stringify(value);
        formData.append(key, questionListJSON);
      } else {
        formData.append(key, value);
      }
    });
    // append userID to formData
    formData.append("userID", user.UserID);

    // Axios POST request to submit form data
    Axios.post("https://way-to-adopt.vercel.app/createPost", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        console.log("Response:", response.data); // log response upon successful ending
        navigate(`/ConfirmSuccess/${successTitle}`); // navigate to success confirmation page
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <Container>
      {/* breadcrumb */}
      <Row>
        <Col>
          <Breadcrumb
            label={[
              { title: "ประกาศหาบ้าน", pathname: "/AllPost" },
              { title: "สร้างประกาศหาบ้าน" },
            ]}
          />
        </Col>
      </Row>
      {/* page title */}
      <Row>
        <PageTitle title="สร้างประกาศตามหาบ้านให้สัตว์" />
      </Row>

      {/* all form components in creating form */}
      <form>
        <Row>
          {/* image input component */}
          <Col md={4}>
            <ImageInput
              formValues={formValues}
              handleFileChange={handleFileChange}
              handleFileReset={handleFileReset}
              error={validationErrors.image}
            ></ImageInput>
          </Col>
          <Col md={8}>
            <div className="create-post-block mt-4">
              <h3 className="text-label mt-2"> เกี่ยวกับประกาศ </h3>
              {/* post title input component */}
              <FormInput
                label="หัวข้อของประกาศ"
                name="postTitle"
                type="text"
                handleChange={handleChange}
                isRequired={true}
                error={validationErrors.postTitle}
              ></FormInput>
              <h3 className="text-label mt-4"> เกี่ยวกับสัตว์ </h3>
              <Container>
                <Row>
                  {/* pet type input component */}
                  <Col md={6}>
                    <SelectInput
                      label="ประเภทของสัตว์"
                      name="petType"
                      defaultValue="1"
                      options={[
                        { value: "1", label: "สุนัข" },
                        { value: "2", label: "แมว" },
                        { value: "3", label: "กระต่าย" },
                        { value: "4", label: "นก" },
                        { value: "5", label: "อื่น ๆ" },
                      ]}
                      handleChange={handleChange}
                      isRequired={true}
                    ></SelectInput>
                  </Col>
                  {/* pet gender input component */}
                  <Col md={6}>
                    <SelectInput
                      label="เพศของสัตว์"
                      name="petGender"
                      defaultValue="M"
                      options={[
                        { value: "M", label: "เพศผู้" },
                        { value: "F", label: "เพศเมีย" },
                        { value: "N", label: "ไม่ทราบ" },
                      ]}
                      handleChange={handleChange}
                      isRequired={true}
                    ></SelectInput>
                  </Col>
                </Row>
                <Row>
                  {/* pet breed input component */}
                  <Col md={6}>
                    <FormInput
                      label="สายพันธุ์ของสัตว์"
                      name="petBreed"
                      type="text"
                      handleChange={handleChange}
                      isRequired={false}
                      error={validationErrors.petBreed}
                    ></FormInput>
                  </Col>
                  {/* pet's date of birth input component */}
                  <Col md={6}>
                    <FormInput
                      label="วันเกิด (ค.ศ.)"
                      name="petDOB"
                      type="date"
                      handleChange={handleChange}
                      isRequired={false}
                      error={validationErrors.petDOB}
                    ></FormInput>
                  </Col>
                </Row>
                <Row>
                  {/* pet vaccination status input component */}
                  <Col md={6}>
                    <RadioInput
                      label="การได้รับวัคซีน"
                      name="petVaccinated"
                      options={[
                        {
                          value: "Y",
                          id: "vaccinatedYes",
                          label: "ได้รับวัคซีนเรียบร้อยแล้ว",
                        },
                        {
                          value: "N",
                          id: "vaccinatedNo",
                          label: "ยังไม่ได้รับวัคซีน",
                        },
                        {
                          value: "NS",
                          id: "vaccinatedDontKnow",
                          label: "ไม่ทราบ",
                          defaultChecked: true,
                        },
                      ]}
                      handleChange={handleChange}
                      isRequired={true}
                    ></RadioInput>
                  </Col>
                  {/* pet sterilization status input component */}
                  <Col md={6}>
                    <RadioInput
                      label="การทำหมัน"
                      name="petSterilized"
                      options={[
                        {
                          value: "Y",
                          id: "sterilizedYes",
                          label: "ทำหมันเรียบร้อยแล้ว",
                        },
                        {
                          value: "N",
                          id: "sterilizedNo",
                          label: "ยังไม่ได้รับการทำหมัน",
                        },
                        {
                          value: "NS",
                          id: "sterilizedDontKnow",
                          label: "ไม่ทราบ",
                          defaultChecked: true,
                        },
                      ]}
                      handleChange={handleChange}
                      isRequired={true}
                    ></RadioInput>
                  </Col>
                </Row>
                <Row>
                  {/* pet weaning status input component */}
                  <Col md={6}>
                    <RadioInput
                      label="การหย่านม"
                      name="petWean"
                      options={[
                        { value: "Y", id: "weanYes", label: "หย่านมแล้ว" },
                        { value: "N", id: "weanNo", label: "ยังไม่หย่านม" },
                        {
                          value: "NS",
                          id: "weanDontKnow",
                          label: "ไม่ทราบ",
                          defaultChecked: true,
                        },
                      ]}
                      handleChange={handleChange}
                      isRequired={true}
                    ></RadioInput>
                  </Col>
                  {/* pet housebreaking status input component */}
                  <Col md={6}>
                    <RadioInput
                      label="การฝึกฝนการขับถ่าย"
                      example="เช่น การใช้กระบะทราย"
                      name="petHouseBreaking"
                      options={[
                        {
                          value: "Y",
                          id: "houseBreakingYes",
                          label: "ฝึกฝนการขับถ่ายเป็นแล้ว",
                        },
                        {
                          value: "N",
                          id: "houseBreakingNo",
                          label: "ยังไม่ฝึกฝนการขับถ่าย",
                        },
                        {
                          value: "NS",
                          id: "houseBreakingDontKnow",
                          label: "ไม่ทราบ",
                          defaultChecked: true,
                        },
                      ]}
                      handleChange={handleChange}
                      isRequired={true}
                    ></RadioInput>
                  </Col>
                </Row>
                {/* pet detail input component */}
                <Row>
                  <TextAreaInput
                    label="รายละเอียดอื่น ๆ"
                    name="petDetail"
                    handleChange={handleChange}
                    isRequired={false}
                  ></TextAreaInput>
                </Row>
              </Container>
            </div>
            {/* question input component */}
            <QuestionInput
              formValues={formValues}
              handleQuestionChange={handleQuestionChange}
              handleQuestionAdd={handleQuestionAdd}
              handleQuestionDelete={handleQuestionDelete}
              error={validationErrors.questions}
            ></QuestionInput>
          </Col>
        </Row>
        <Row>
          <div className="btn-container">
            {/* button to go back to the previous page */}
            <Col md={4}>
              <GoBackButton></GoBackButton>
            </Col>
            {/* button to submit the form (trigger the creating confirmation modal) */}
            <Col md={8} className="submit-container">
              <SubmitButton
                onClick={handleSubmit}
                title="สร้างประกาศใหม่"
              ></SubmitButton>
            </Col>
          </div>
        </Row>
      </form>
      {/* modal for creating confirmation */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onConfirm={handleConfirm}
        title="ยืนยันสร้างประกาศตามหาบ้าน"
      />
    </Container>
  );
};

export default CreatePost;
