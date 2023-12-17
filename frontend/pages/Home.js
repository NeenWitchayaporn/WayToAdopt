import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { Row, Container } from "react-bootstrap";
import "../styles/Home.css";
import CheckLogin from "../components/CheckLogin";
import PetCard from "../components/PetCard";

// Home component renders a Home page with 6 available posts
const Home = () => {
  const [user, setUser] = useState(null); //state to store user data
  const [loadingUser, setLoadingUser] = useState(true); //state to handle user loading status

  const [post, setPost] = useState([]); //state to store post data
  const [loadingPost, setLoadingPost] = useState(true); //state to handle post loading status

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

  // fetch all post data
  useEffect(() => {
    const fetchPostData = async () => {
      try {
        // fetch post data store in response
        const response = await Axios.get("https://way-to-adopt.vercel.app/read/post/all");

        setPost(response.data); // set fetched post data
        setLoadingPost(false); // set loading state to false
      } catch (error) {
        console.error("Error fetching post data:", error);
      }
    };
    fetchPostData();
  }, []);

  // conditional rendering based on loading and user status
  if (!loadingUser && !user) {
    console.log("User not logged in");
    return navigate("/Login", { state: "3" }); // redirect to login page if the user is not logged in
  }

  return (
    <Container className="home">
      <Row bsPrefix="custom">
        <div className="greeting">
          <p className="hello">สวัสดี</p>
          {/* check loading state is loading or not */}
          {loadingUser ? (
            // if user data is loading, render loading text
            <p>Loading...</p>
          ) : (
            // if user data already load, render firstname of user
            <p className="name">คุณ {user.UserFirstName}</p>
          )}
        </div>
      </Row>
      <Row>
        <Container className="content">
          <Row>
            <p className="introduce">
              สัตว์ตามหาบ้าน <span className="intro">แนะนำสำหรับคุณ</span>
            </p>
          </Row>
          <Row>
            {/* check loading state is not loading */}
            {!loadingPost && post.length > 0 ? (
              // if there are post data, mapping the post data and PetCard component to show post of pet
              <div className="post">
                {post.map((item) => (
                  <React.Fragment key={item.PostID}>
                    {/* render PetCard component with data of each post */}
                    <PetCard
                      postID={item.PostID}
                      postTitle={item.PostTitle}
                      petTypeName={item.PetTypeName}
                      petBreed={item.PetBreed}
                      petDOB={item.PetDOB}
                      petPic={item.PetPic}
                    />
                  </React.Fragment>
                ))}
              </div>
            ) : (
              // check loading state is not loading and if no post, render a no post message
              !loadingPost && (
                <div className="no-post">
                  <p>ไม่พบประกาศ</p>
                </div>
              )
            )}
          </Row>
        </Container>
      </Row>
    </Container>
  );
};
export default Home;
