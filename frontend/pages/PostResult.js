import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";
import "../styles/PostResult.css";
import PageTitle from "../components/PageTitle";
import ListAdopter from "../components/ListAdopter";
import GoBackButton from "../components/GoBackButton";
import Breadcrumb from "../components/Breadcrumb";
import CheckLogin from "../components/CheckLogin";

// PostResult components renders a page to display adoption result of post based on postID
const PostResult = () => {
  const [user, setUser] = useState(null); //state to store user data
  const [loadingUser, setLoadingUser] = useState(true); //state to handle user loading status

  // get the postID from the location state
  const location = useLocation();
  const state = location.state;
  const postID = state;

  const navigate = useNavigate();
  const [isClick, setIsClick] = useState(true); // state to handle button clicking

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

  // function to handle displaying all the pending adoptions
  const handleShowPendingAdoption = () => {
    setIsClick(true);
  };

  // function to handle displaying all the refused adoptions
  const handleShowRefusedAdoption = () => {
    setIsClick(false);
  };

  useEffect(() => {
    if (!postID) {
      navigate(`/AllPost`); // navigate to all post page if no postID is found in state
    }
  }, [postID, navigate]);

  // conditional rendering based on loading and user status
  if (!loadingUser && !user) {
    console.log("User not logged in");
    return navigate("/Login", { state: "3" }); // redirect to login page if the user is not logged in
  }

  return (
    <Container>
      {/* breadcrumb */}
      <Row>
        <Col>
          <Breadcrumb
            label={[
              { title: "ประกาศหาบ้าน", pathname: "/AllPost" },
              { title: "ผลลัพธ์จากประกาศ" },
            ]}
          />
        </Col>
      </Row>

      {/* page title */}
      <Row>
        <PageTitle title="ผลลัพธ์จากประกาศ" />
      </Row>

      <Row>
        {/* buttons to toggle between pending and refused adoption */}
        <div className="top-button-container">
          <button
            type="button"
            className={`${
              isClick ? "show-answer-btn" : "show-reject-answer-btn"
            }`}
            onClick={handleShowPendingAdoption}
          >
            <span>การตอบกลับล่าสุด</span>
          </button>
          <button
            type="button"
            className={`${
              !isClick ? "show-answer-btn" : "show-reject-answer-btn"
            }`}
            onClick={handleShowRefusedAdoption}
          >
            <span>การตอบกลับที่ถูกปฏิเสธ</span>
          </button>
        </div>
      </Row>

      <Row>
        {/* render ListAdopter based on the adoption status */}
        {isClick ? (
          <ListAdopter postID={postID} adoptStatus="0"></ListAdopter>
        ) : (
          <ListAdopter postID={postID} adoptStatus="1"></ListAdopter>
        )}
      </Row>
      <Row>
        {/* button to go back to the previous page */}
        <Col md={4}>
          <GoBackButton></GoBackButton>
        </Col>
      </Row>
    </Container>
  );
};

export default PostResult;
