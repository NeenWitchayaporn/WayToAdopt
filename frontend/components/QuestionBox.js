import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { Container, Row, Col, Form } from "react-bootstrap";
import "./QuestionBox.css";
import Modal from "./Modal";
import SubmitButton from "./SubmitButton";
import GoBackButton from "./GoBackButton";
import ErrorText from "./ErrorText";

/* AdoptQuestion component for handling the adoption questionnaire from post base on postID
 * postID : ID of the post
 * userID : ID of the user
 */
const QuestionBox = ({ postID, userID }) => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]); // state to store question data
  const [answers, setAnswers] = useState({}); // state to store answer (input)
  const [validationErrors, setValidationErrors] = useState({}); // state to store validation errors
  const [isModalOpen, setIsModalOpen] = useState(false); // state to handle modal visibility
  const title = "คำตอบของคุณถูกส่งแล้ว"; // title for ConfirmSucess page

  // fetch question data based on postID
  useEffect(() => {
    Axios.get(`https://way-to-adopt.vercel.app/questions/${postID}`).then((response) => {
      setQuestions(response.data); // set fetched question data

      // initializing answers
      const initialAnswers = {};
      response.data.forEach((question) => {
        initialAnswers[question.PostQID] = "";
      });
      setAnswers(initialAnswers);
    });
  }, [postID]);

  // function to handle input changes in the questionnaire
  const handleInputChange = (questionID, value) => {
    // update the answer input
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionID]: value,
    }));
    // if changed answer have caused any error before, reset validation errors of that index
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [questionID]: undefined,
    }));
  };

  // function to handle form submission
  const handleSubmit = (event) => {
    // prevent default form submission
    event.preventDefault();

    // validate answer inputs and set errors
    const errors = {};
    Object.keys(answers).forEach((questionID) => {
      if (!answers[questionID]) {
        errors[questionID] = "กรุณากรอกคำตอบ";
      }
    });
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

  // function to handle confirm submiting answer
  const handleConfirm = () => {
    // Axios POST request to submit answer
    Axios.post("https://way-to-adopt.vercel.app/submitAnswers", {
      postID,
      adopterID: userID,
      answers,
    })
      .then((response) => {
        console.log("Response:", response.data); // log response upon successful ending
        navigate(`/ConfirmSuccess/${title}`); // navigate to success confirmation page
      })
      .catch((error) => {
        console.error("Error:", error); // log error upon fail ending
      });
  };

  // rendering the adoption questionnaire and related components
  return (
    <>
      <Container className="main-container">
        <Row>
          <Col md={4}></Col>
          <Col md={8}>
            {/* questionnaire block */}
            <div className="question-block mt-4">
              <h3 className="text-label text-question">
                กรุณาตอบคำถามก่อนยืนยันการรับเลี้ยง
              </h3>
              {/* question block for mapping through questions */}
              <Container className="no-padding-container">
                <Form>
                  <div className="post-block-adopt-question mt-4">
                    {Array.isArray(questions) &&
                      questions.map((question) => (
                        <div key={question.PostQID} className="top-text">
                          <Form.Label className="question">
                            {question.QuestionTitle}
                          </Form.Label>
                          {/* input field for adopter's answer */}
                          <input
                            className={`question-answer ${
                              validationErrors[question.PostQID]
                                ? "has-error-border"
                                : ""
                            }`}
                            tabIndex={-1}
                            type="text"
                            id={`QuestionAnswer${question.PostQID}`}
                            name={`QuestionAnswer${question.PostQID}`}
                            placeholder="ตอบคำถามที่นี่"
                            value={answers[question.PostQID]}
                            onChange={(event) =>
                              handleInputChange(
                                question.PostQID,
                                event.target.value
                              )
                            }
                            required
                          />
                          {/* display error text if any error occurs */}
                          {validationErrors[question.PostQID] && (
                            <ErrorText
                              errorText={validationErrors[question.PostQID]}
                              size="short"
                            />
                          )}
                        </div>
                      ))}
                  </div>
                </Form>
              </Container>
            </div>
          </Col>
        </Row>
        <Row>
          {/* button to go back to the previous page */}
          <Col md={4}>
            <GoBackButton />
          </Col>
          {/* button to submit the answer (trigger the submiting confirmation modal) */}
          <Col md={8}>
            <div className="submit-ans-btn">
              <SubmitButton title="ส่งคำตอบ" onClick={handleSubmit} />
            </div>
          </Col>
        </Row>
      </Container>
      {/* modal for submiting confirmation */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onConfirm={handleConfirm}
        title="ยืนยันการส่งคำตอบ"
      />
    </>
  );
};

export default QuestionBox;
