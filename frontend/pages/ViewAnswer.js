import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Axios from "axios";
import { Row, Container, Col } from "react-bootstrap";
import "../styles/ViewAnswer.css";
import ResultBox from "../components/ResultBox";
import Breadcrumb from "../components/Breadcrumb";
import GoBackButton from "../components/GoBackButton";
import PageTitle from "../components/PageTitle";
import CheckLogin from "../components/CheckLogin";
import ManageAdopterButtons from "../components/MangeAdopterButtons";

// ViewAnswer components renders a page to display answer from user based on adoptID
const ViewAnswer = () => {
  // get the adoptID from the location state
  const location = useLocation();
  const { adoptID, adopterID } = location.state;

  const [user, setUser] = useState(null); //state to store user data
  const [loadingUser, setLoadingUser] = useState(true); //state to handle user loading status

  const [answerData, setAnswerData] = useState([]); // state to store answer data
  const [loading, setLoading] = useState(true); // state to handle loading state

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

  // fetch answer data based on adoptID
  useEffect(() => {
    setLoading(true); // set loading state to true
    Axios.get(`https://way-to-adopt.vercel.app/read/answer/${adoptID}`).then(
      (response) => {
        setAnswerData(response.data); // set fetched answer data
        setLoading(false); // set loading state to false
      }
    );
  }, [adoptID]);

  // conditional rendering based on loading and user status
  if (!loadingUser && !user) {
    console.log("User not logged in");
    return navigate("/Login", { state: "3" }); // redirect to login page if the user is not logged in
  }

  return (
    <Container className="view-result">
      <div className="content">
        {/* breadcrumb */}
        <Row>
          <Col>
            <Breadcrumb
              label={[
                { title: "ประกาศหาบ้าน", pathname: "/AllPost" },
                { title: "ผลลัพธ์จากประกาศ", pathname: "/-1" },
                { title: "การตอบกลับ" },
              ]}
            />
          </Col>
        </Row>

        {/* page title */}
        <Row className="custom-row">
          <PageTitle title="การตอบกลับ" />
        </Row>

        {/* display all posts */}
        <Row>
          <div className="result-box">
            {!loading &&
              // mapping through each answer
              answerData.map((answer) => (
                <ResultBox
                  key={answer.PostQID}
                  questionTitle={answer.QuestionTitle}
                  questionAnswer={answer.QuestionAnswer}
                />
              ))}
          </div>
        </Row>
      </div>
      <Row>
        {/* button to go back to the previous page */}
        <Col md={4}>
          <GoBackButton></GoBackButton>
        </Col>
        {/* render buttons for linking to another page and managing adopter */}
        <Col md={8}>
          <div className="result-button-container">
            <ManageAdopterButtons
              adoptID={adoptID}
              adopterID={adopterID}
              showViewButton={false}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ViewAnswer;
