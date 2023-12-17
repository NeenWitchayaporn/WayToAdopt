import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import PetDetail from "../components/PetDetail";
import Breadcrumb from "../components/Breadcrumb";
import QuestionBox from "../components/QuestionBox";
import CheckLogin from "../components/CheckLogin";

/* AdoptionQuestion components renders a page to display pet detail and
 * adoption question form of the post based on postID
 */
const AdoptionQuestion = () => {
  // get the postID from the location state
  const location = useLocation();
  const state = location.state;
  const postID = state;

  const [user, setUser] = useState(null); //state to store user data
  const [loadingUser, setLoadingUser] = useState(true); //state to handle user loading status

  const navigate = useNavigate();
  const [postData, setPostData] = useState([]);     // state to store post data
  const [loading, setLoading] = useState(true);     // state to handle loading state

  const isPostDeleted = postData.PostStatus === 2;  // check whether post was deleted or not


  // fetch user data and navigate to login if not logged in
  useEffect(() => {
    const fetchData = async () => {
      try {
        // use CheckLogin component to check if the user is logged in and fetch user data
        const result = await CheckLogin();

        // navigate to login page if the user is not logged in
        if (!result) {
          return navigate("/Login", { state : '3' });
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
      navigate(`/Home`);      // navigate to home page if no postID is found in state
    }
    setLoading(true);     // set loading state to true
    Axios.get(`https://way-to-adopt.vercel.app/read/${postID}`).then((response) => {
      setPostData(response.data);     // set fetched post data
      setLoading(false);              // set loading state to false
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
              { title: "รายละเอียดสัตว์เลี้ยง", pathname: "/-1" },
              { title: "ตอบคำถามก่อนการรับเลี้ยง" },
            ]}
          />
        </Col>
      </Row>
      {/* display pet detail */}
      {!loading && (
        <>
          {!isPostDeleted ? (
             // if post was not deleted, display pet detail and adoption question form
            <>
              <PetDetail postID={postID} />
              <Row>
                <QuestionBox postID={postID} userID={user.UserID}/>
              </Row>
            </>
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
        </>
      )}
    </Container>
  );
};

export default AdoptionQuestion;
