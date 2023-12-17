import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Axios from "axios";
import { Col, Row, Container } from "react-bootstrap";
import "../styles/SearchResult.css";
import Breadcrumb from "../components/Breadcrumb";
import CheckLogin from "../components/CheckLogin";
import PetCard from "../components/PetCard";

// SearchResult component for rendering posts from search based on query parameters
const SearchResult = () => {
  // get the current location
  const location = useLocation();

  // extracting search parameters from the location state
  const state = location.state;
  const petType = state.petType;
  const petVaccinated = state.petVaccinated;
  const petSterilized = state.petSterilized;
  const petWean = state.petWean;
  const petHousebreaking = state.petHousebreaking;

  // create the query parameters for search
  const queryParams = `PetType=${petType}&PetVaccinated=${petVaccinated}&PetSterilized=${petSterilized}&PetWean=${petWean}&PetHousebreaking=${petHousebreaking}`;

  const [user, setUser] = useState(null); //state to store user data
  const [loadingUser, setLoadingUser] = useState(true); //state to handle user loading status
  const [post, setPost] = useState([]); // state to store the search results
  const [loadingPost, setLoadingPost] = useState(true); // state to manage loading status
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

  // fetch search results based on query parameters
  useEffect(() => {
    const fetchPostData = async () => {
      try {
        // fetch post data store in response
        const response = await Axios.get(
          `https://way-to-adopt.vercel.app/search?${queryParams}`
        );
        // set fetched post data
        setPost(response.data);
        // set loading state to false
        setLoadingPost(false);
      } catch (error) {
        console.error("Error fetching post data:", error);
      }
    };
    fetchPostData();
  }, [queryParams]);

  // conditional rendering based on loading and user status
  if (!loadingUser && !user) {
    console.log("User not logged in");
    return navigate("/Login", { state: "3" }); // redirect to login page if the user is not logged in
  }

  // defined CSS searchResultPostClassName class name based on the number of search results
  const searchResultPostClassName =
    post.length < 3
      ? "search-result-post space-evenly"
      : "search-result-post space-between";

  return (
    <Container className="search-result">
      <Row>
        <Col>
          {/* Breadcrumb component for navigation */}
          <Breadcrumb
            label={[
              { title: "ค้นหา", pathname: "/search" },
              { title: "ผลลัพธ์การค้นหา", pathname: "/search-result" },
            ]}
          />
        </Col>
      </Row>
      <Row>
        {/* render page title */}
        <p className="search-result-introduce">
          สัตว์ตามหาบ้าน <span className="intro">จากการค้นหาของคุณ</span>
        </p>
      </Row>
      <Row>
        {/* check loading state is not loading */}
        {!loadingPost && post.length > 0 ? (
          // if there are results form search, mapping the post data and PetCard component to show post of pet
          <div className={searchResultPostClassName}>
            {post.map((item, index) => (
              // render PetCard component with data of each post
              <PetCard
                key={index}
                postID={item.PostID}
                postTitle={item.PostTitle}
                petTypeName={item.PetTypeName}
                petBreed={item.PetBreed}
                petDOB={item.PetDOB}
                petPic={item.PetPic}
              />
            ))}
          </div>
        ) : (
          // check loading state is not loading and if no result are found, render a no result message
          !loadingPost && (
            <div className="no-result">
              <p>ไม่พบประกาศตามผลลัพธ์การค้นหาของคุณ</p>
            </div>
          )
        )}
      </Row>
    </Container>
  );
};
export default SearchResult;
