import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Axios from "axios";
import { Row, Col, Container } from "react-bootstrap";
import "../styles/AdopterContact.css";
import Breadcrumb from "../components/Breadcrumb";
import CheckLogin from "../components/CheckLogin";
import GoBackButton from "../components/GoBackButton";

// fetches aopter information from the server based on adopterID
const AdopterContact = () => {
  // get the current location
  const location = useLocation();

  // extracting adopterID from the location state
  const state = location.state;
  const adopterID = state.adopterID;

  const [user, setUser] = useState(null); //state to store user data
  const [loadingUser, setLoadingUser] = useState(true); //state to handle user loading status

  const [adopter, setAdopter] = useState(null); //state to store user data
  const [loadingAdopter, setLoadingAdopter] = useState(true); //state to handle user loading status

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

  // fetch adopter data based on adopterID
  useEffect(() => {
    const fetchAdopterData = async () => {
      try {
        // fetch adopter data store in response
        const response = await Axios.get(
          `https://way-to-adopt.vercel.app/adopter/${adopterID}`
        );
        // set fetched adopter data
        setAdopter(response.data);
        // set loading state to false
        setLoadingAdopter(false);
      } catch (error) {
        console.error("Error fetching post data:", error);
      }
    };
    fetchAdopterData();
  }, [adopterID]);

  // conditional rendering based on loading and user status
  if (!loadingUser && !user) {
    console.log("User not logged in");
    return navigate("/Login", { state: "3" }); // redirect to login page if the user is not logged in
  }

  return (
    <Container className="adopter-contact-page">
      <Row>
        <Col>
          {/* breadcrumb component for navigation */}
          <Breadcrumb
            label={[
              { title: "ประกาศตามหาบ้าน", pathname: "/AllPost" },
              { title: "ผลลัพธ์จากการประกาศ", pathname: "/-1" },
              { title: "ติดต่อผู้รับเลี้ยง" },
            ]}
          />
        </Col>
      </Row>
      <div className="content-adopter-contact">
        <Row>
          <h2>ข้อมูลติดต่อผู้รับเลี้ยง</h2>
        </Row>
        {/* check loading state is not loading */}
        {loadingAdopter ? (
          <div>Loading...</div>
        ) : (
          <Row>
            <Row>
              {/* Adopter details section */}
              <div className="box-adopter-contact">
                <Row>
                  {/* Adopter information displayed in rows */}
                  <div className="text-group-adopter-contact">
                    <Col>
                      <div className="row-adopter-contact">
                        ชื่อจริง
                        <div className="info-adopter-contact">
                          {adopter.UserFirstName}
                        </div>
                      </div>
                    </Col>
                    <Col>
                      <div className="row-2-adopter-contact">
                        นามสกุล
                        <div className="info-adopter-contact">
                          {adopter.UserLastName}
                        </div>
                      </div>
                    </Col>
                  </div>
                </Row>
                <Row>
                  <div className="text-group-adopter-contact">
                    <Col>
                      <div className="row-adopter-contact">
                        เบอร์โทรศัพท์
                        <div className="info-adopter-contact">
                          {adopter.UserPhone}
                        </div>
                      </div>
                    </Col>
                    <Col>
                      <div className="row-2-adopter-contact">
                        Email
                        <div className="info-adopter-contact">
                          {adopter.UserEmail}
                        </div>
                      </div>
                    </Col>
                  </div>
                </Row>
              </div>
            </Row>
            <Row>
              {/* button to go back to the previous page */}
              <Col md={4}>
                <GoBackButton></GoBackButton>
              </Col>
            </Row>
          </Row>
        )}
      </div>
    </Container>
  );
};

export default AdopterContact;
