import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";
import "../styles/Search.css";
import Breadcrumb from "../components/Breadcrumb";
import CheckLogin from "../components/CheckLogin";
import PageTitle from "../components/PageTitle";
import SearchRadioInput from "../components/SearchRadioInput";
import SubmitButton from "../components/SubmitButton";

// Search component renders a Search page with 4 search type
const Search = () => {
  // initial values for the search state
  const initialSearchValues = {
    petType: "",
    petVaccinated: "",
    petSterilized: "",
    petWean: "",
    petHouseBreaking: "",
  };

  const [user, setUser] = useState(null); //state to store user data
  const [loadingUser, setLoadingUser] = useState(true); //state to handle user loading status
  const [searchValues, setSearchValues] = useState(initialSearchValues); // state to handle the form values
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

  // function to handle the change in the search values
  const handleChange = (event) => {
    const { name, value } = event.target;
    setSearchValues({ ...searchValues, [name]: value });
  };

  // conditional rendering based on loading and user status
  if (!loadingUser && !user) {
    console.log("User not logged in");
    return navigate("/Login", { state: "3" }); // redirect to login page if the user is not logged in
  }

  return (
    <form className="search">
      <Container>
        <Row>
          <Col>
            {/* breadcrumb */}
            <Breadcrumb label={[{ title: "ค้นหา", pathname: "/search" }]} />
          </Col>
        </Row>
        <Row>
          {/* render page title */}
          <div className="title">
            {/* mapping page tile and PageTitle component to render title of page */}
            <PageTitle title="ค้นหา" />
          </div>
        </Row>
        <Row>
          {/* pet type search */}
          <div className="search-type">
            {/* mapping input and SearchRadioInput component to render input type for search */}
            <SearchRadioInput
              label="ประเภทสัตว์เลี้ยง"
              name="petType"
              options={[
                {
                  value: "1",
                  id: "Dog",
                  label: "สุนัข",
                },
                {
                  value: "2",
                  id: "Cat",
                  label: "แมว",
                },
                {
                  value: "3",
                  id: "Bird",
                  label: "นก",
                },
                {
                  value: "4",
                  id: "Other",
                  label: "อื่น ๆ ",
                },
                {
                  value: "",
                  id: "typeDontSelect",
                  label: " ไม่เลือกประเภทสัตว์เลี้ยง",
                  defaultChecked: true,
                },
              ]}
              handleChange={handleChange}
              isSpan={true}
            ></SearchRadioInput>
          </div>
        </Row>
        <Row>
          <Container className="search-specialist" bsPrefix="custom">
            <Row className="search-specialist-row" bsPrefix="custom">
              <Col md={3} bsPrefix="custom">
                {/* pet vaccinated search */}
                <div className="search-specialist-col-1">
                  {/* mapping input and SearchRadioInput component to render input vaccinated for search */}
                  <SearchRadioInput
                    label="การได้รับวัคซีน"
                    name="petVaccinated"
                    options={[
                      {
                        value: "Y",
                        id: "vaccienatedYes",
                        label: "ได้รับวัคซีนเรียบร้อยแล้ว",
                      },
                      {
                        value: "N",
                        id: "vaccienatedNo",
                        label: "ยังไม่ได้รับวัคซีน",
                      },
                      {
                        value: "",
                        id: "vaccienatedDontSelect",
                        label: "ไม่เลือกการได้รับวัคซีน",
                        defaultChecked: true,
                      },
                    ]}
                    handleChange={handleChange}
                    isSpan={false}
                  ></SearchRadioInput>
                </div>
              </Col>
              <Col md={3} bsPrefix="custom">
                {/* pet sterilized search */}
                <div className="search-specialist-col-2">
                  {/* mapping input and SearchRadioInput component to render input sterilized for search */}
                  <SearchRadioInput
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
                        value: "",
                        id: "sterilizedDontSelect",
                        label: "ไม่เลือกการทำหมัน",
                        defaultChecked: true,
                      },
                    ]}
                    handleChange={handleChange}
                    isSpan={false}
                  ></SearchRadioInput>
                </div>
              </Col>
              <Col md={2} bsPrefix="custom">
                {/* pet wean search */}
                <div className="search-specialist-col-3">
                  {/* mapping input and SearchRadioInput component to render input wean for search */}
                  <SearchRadioInput
                    label="การหย่านม"
                    name="petWean"
                    options={[
                      {
                        value: "Y",
                        id: "weanYes",
                        label: "หย่านมแล้ว",
                      },
                      {
                        value: "N",
                        id: "weanNo",
                        label: "ยังไม่หย่านม",
                      },
                      {
                        value: "",
                        id: "weanDontSelect",
                        label: "ไม่เลือกการหย่านม",
                        defaultChecked: true,
                      },
                    ]}
                    handleChange={handleChange}
                    isSpan={false}
                  ></SearchRadioInput>
                </div>
              </Col>
              <Col md={4} bsPrefix="custom">
                {/* pet housebreaking search */}
                <div className="search-specialist-col-4">
                  {/* mapping input and SearchRadioInput component to render input housebreaking for search */}
                  <SearchRadioInput
                    label="การฝึกฝนการขับถ่าย"
                    name="petHousebreaking"
                    options={[
                      {
                        value: "Y",
                        id: "housebreakingYes",
                        label: "ฝึกฝนการขับถ่ายเป็นแล้ว",
                      },
                      {
                        value: "N",
                        id: "housebreakingNo",
                        label: "ยังไม่ฝึกฝนการขับถ่าย",
                      },
                      {
                        value: "",
                        id: "housebreakingDontSelect",
                        label: "ไม่เลือกการฝึกฝนการขับถ่าย",
                        defaultChecked: true,
                      },
                    ]}
                    handleChange={handleChange}
                    isSpan={false}
                  ></SearchRadioInput>
                </div>
              </Col>
            </Row>
          </Container>
        </Row>
        {/* render search button with specified search values */}
        <div className="find-button">
          <Link
            to={`/SearchResult`}
            state={{
              petType: searchValues.petType,
              petVaccinated: searchValues.petVaccinated,
              petSterilized: searchValues.petSterilized,
              petWean: searchValues.petWean,
              petHousebreaking: searchValues.petHouseBreaking,
            }}
          >
            {/* render search button by used Submitbutton component */}
            <div className="find-btn">
              <SubmitButton title="ค้นหา"></SubmitButton>
            </div>
          </Link>
        </div>
      </Container>
    </form>
  );
};

export default Search;
