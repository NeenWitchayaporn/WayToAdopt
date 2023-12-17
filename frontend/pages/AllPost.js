import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import { Row, Col, Container } from "react-bootstrap";
import "../styles/AllPost.css";
import PageTitle from "../components/PageTitle";
import SubmitButton from "../components/SubmitButton";
import EditStatusButton from "../components/EditStatusButtons";
import Breadcrumb from "../components/Breadcrumb";
import CheckLogin from "../components/CheckLogin";

// AllPost components renders a page with all post created by user based on userID
const AllPost = () => {
  const [user, setUser] = useState(null); //state to store user data
  const [loadingUser, setLoadingUser] = useState(true); //state to handle user loading status

  const [postData, setPostData] = useState([]); // state to store post data
  const [loadingPost, setLoadingPost] = useState(true); // state to handle post loading state
  const [loading, setLoading] = useState(true); // state to handle loading state

  const hasPost = postData.length > 0; // check whether there are any posts

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

  // fetch post data based on userID
  useEffect(() => {
    setLoadingPost(true); // set loading state to true
    if (user) {
      const userID = user.UserID;
      Axios.get(`https://way-to-adopt.vercel.app/read/allpost/${userID}`).then(
        (response) => {
          setPostData(response.data); // set fetched post data
          setLoadingPost(false); // set loading state to false
        }
      );
    }
  }, [user]);

  // function to handle the change in button loading state
  const handleLoadButtonChange = (loadingButton) => {
    setLoading(loadingPost || loadingButton);
  };

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
          <Breadcrumb label={[{ title: "ประกาศหาบ้าน" }]} />
        </Col>
      </Row>

      {/* page title */}
      <Row className="custom-row">
        <PageTitle title="รวมประกาศที่สร้าง" />
      </Row>

      {/* display all posts */}
      {!loadingPost && hasPost
        ? // if there are posts, render post data (post title)
          postData.map((post) => (
            <Row key={post.PostID}>
              {!loading && (
                <Col md={6}>
                  <div className="title-box">
                    {/* link to the PostDetail page with associated state */}
                    <Link
                      to={`/PostDetail`}
                      state={post.PostID}
                      className="link-style"
                    >
                      <p className="title-text">{post.PostTitle}</p>
                    </Link>
                  </div>
                </Col>
              )}
              {/* render buttons for linking to another page and editing status */}
              <Col md={6}>
                <div className="button-container">
                  <EditStatusButton
                    postID={post.PostID}
                    onChange={handleLoadButtonChange}
                  />
                </div>
              </Col>
            </Row>
          ))
        : !loadingPost && (
            // if no adopters, show a message
            <Row>
              <Col md={12}>
                <div className="no-post-box">
                  <p className="no-post-text">ยังไม่มีประกาศที่ถูกสร้าง</p>
                </div>
              </Col>
            </Row>
          )}
      {/* button to create new post (link to create post page) */}
      <Row>
        <Col md={12}>
          <div className="create-btn">
            <Link to={`/CreatePost`} className="link-style">
              <SubmitButton title="สร้างประกาศใหม่"></SubmitButton>
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AllPost;
