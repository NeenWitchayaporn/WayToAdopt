import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Axios from "axios";
import { Row, Col, Container } from "react-bootstrap";
import "../styles/PostDetail.css";
import EditStatusButton from "../components/EditStatusButtons";
import GoBackButton from "../components/GoBackButton";
import PetDetail from "../components/PetDetail";
import Breadcrumb from "../components/Breadcrumb";
import CheckLogin from "../components/CheckLogin";

// PostDetail components renders a page to display detail of post based in postID
const PostDetail = () => {
  // get the postID from the location state
  const location = useLocation();
  const state = location.state;
  const postID = state;

  const navigate = useNavigate();
  const [postData, setPostData] = useState([]); // state to store post data
  const [loading, setLoading] = useState(true); // state to handle loading state

  const [user, setUser] = useState(null); //state to store user data
  const [loadingUser, setLoadingUser] = useState(true); //state to handle user loading status

  const isPostDeleted = postData.PostStatus === 2; // check whether post was deleted or not

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

  // fetch post data based on postID
  useEffect(() => {
    if (!postID) {
      navigate(`/AllPost`); // navigate to all post page if no postID is found in state
    }
    setLoading(true); // set loading state to true
    Axios.get(`https://way-to-adopt.vercel.app/read/${postID}`).then((response) => {
      setPostData(response.data); // set fetched post data
      setLoading(false); // set loading state to false
    });
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
              { title: "รายละเอียดของประกาศ" },
            ]}
          />
        </Col>
      </Row>
      {/* display post detail */}
      {!loading && (
        <>
          {!isPostDeleted ? (
            // if post was not deleted, display pet detail
            <PetDetail postID={postID} />
          ) : (
            // if post was deleted, show a message
            <Row>
              <Col md={12}>
                <div className="no-post-box">
                  <p className="no-post-text">ประกาศถูกลบแล้ว</p>
                </div>
              </Col>
            </Row>
          )}
          <Row>
            {/* button to go back to the previous page */}
            <Col md={4}>
              <GoBackButton></GoBackButton>
            </Col>
            {/* buttons for linking to another page and editing status */}
            <Col md={8}>
              <div className="detail-button-container">
                <EditStatusButton postID={postID} onChange={() => {}} />
              </div>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default PostDetail;
