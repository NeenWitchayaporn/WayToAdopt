import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import "../styles/ConfirmSuccess.css";
import correctIcon from "../components/image/correct.svg";
import SubmitButton from "../components/SubmitButton";
import CheckLogin from "../components/CheckLogin";

// ConfirmSuccess components renders a page that show success confirmation with specified title
const ConfirmSuccess = () => {
  const { title } = useParams(); // fetch the title parameter from the URL
  // state variables to manage user data and loading status
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
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

  return (
    <Container className="success-container">
      <Row>
        <Col md={12}>
          {/* display the success message with the icon */}
          <div className="success-content">
            <img
              src={correctIcon}
              alt="Correct Icon"
              className="correct-icon"
            />
            <p className="success-text">{title}</p>
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          {/* button to navigate back to the home page */}
          <div className="back-home-btn">
            <Link to={`/Home`} className="link-style">
              <SubmitButton title="กลับสู่หน้าหลัก"></SubmitButton>
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ConfirmSuccess;
