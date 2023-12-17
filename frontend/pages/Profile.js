import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { Row, Col, Container } from "react-bootstrap";
import "../styles/Profile.css";
import Breadcrumb from "../components/Breadcrumb";

// fetches user information from the server based on the stored ID token
const Profile = () => {
  // state variables to manage user data and loading status
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // useEffect hook to fetch user data when the component mounts
  useEffect(() => {
    // define a fetchData function to make an asynchronous request
    const fetchData = async () => {
      try {
        // retrieve the stored ID token from local storage
        const storedIdToken = localStorage.getItem("yourIdToken");

        // redirect to the login page if no ID token is found
        if (!storedIdToken) {
          return navigate("/Login", { state: "3" });
        }

        // make a GET request to fetch user data from the server
        const response = await Axios.get("https://way-to-adopt.vercel.app/user", {
          headers: {
            Authorization: `Bearer ${storedIdToken}`,
          },
        });

        // extract user data from the response
        const userData = response.data.user;

        // set the user state variable with fetched data
        setUser(userData);
      } catch (error) {
        console.error("Error getting user information:", error);
      } finally {
        // set loading to false once data fetching is complete
        setLoading(false);
      }
    };

    // call the fetchData function when the component mounts
    fetchData();
  }, [navigate]);

  // function to handle user logout
  const handleLogout = () => {
    // clear tokens from local storage
    localStorage.removeItem("yourIdToken");

    // clear user data
    setUser(null);

    // navigate to the login page or perform any other client-side actions
    navigate(`/Login`, { state: "2" });
  };

  // conditional rendering based on loading and user status
  if (!loading && !user) {
    console.log("User not logged in");
    return navigate("/Login", { state: "3" }); // redirect to login page if the user is not logged in
  }
  return (
    <Container className="profile-page">
      <Row>
        <Col>
          {/* Breadcrumb component for navigation */}
          <Breadcrumb label={[{ title: "ข้อมูลผู้ใช้งาน" }]} />
        </Col>
      </Row>
      <div className="content-profile">
        <Row>
          <h2>ข้อมูลผู้ใช้งาน</h2>
        </Row>
        {loading ? (
          <div>Loading...</div>
        ) : user ? (
          <Row>
            <Row>
              {/* Profile details section */}
              <div className="box-profile">
                <Row>
                  {/* User information displayed in rows */}
                  <div className="text-group-profile">
                    <Col>
                      <div className="row-profile">
                        ชื่อจริง
                        <div className="info-profile">{user.UserFirstName}</div>
                      </div>
                    </Col>
                    <Col>
                      <div className="row-2-profile">
                        นามสกุล
                        <div className="info-profile">{user.UserLastName}</div>
                      </div>
                    </Col>
                  </div>
                </Row>
                <Row>
                  <div className="text-group-profile">
                    <Col>
                      <div className="row-profile">
                        วันเกิด (ค.ศ.)
                        <div className="info-profile">
                          {user.UserDOB}
                        </div>
                      </div>
                    </Col>
                    <Col>
                      <div className="row-2-profile">
                        เพศ
                        <div className="info-profile">
                          {user.UserGender === "M"
                            ? "ชาย"
                            : user.UserGender === "F"
                            ? "หญิง"
                            : "ไม่ระบุ"}
                        </div>
                      </div>
                    </Col>
                  </div>
                </Row>
                <Row>
                  <div className="text-group-profile">
                    <Col>
                      <div className="row-profile">
                        เบอร์โทรศัพท์
                        <div className="info-profile">{user.UserPhone}</div>
                      </div>
                    </Col>
                    <Col>
                      <div className="row-2-profile">
                        Email
                        <div className="info-profile">{user.UserEmail}</div>
                      </div>
                    </Col>
                  </div>
                </Row>
              </div>
            </Row>
            <Row>
              <div className="button-group-profile">
                <Row>
                  <div className="button-2-profile">
                    {/* Logout button */}
                    <button className="log-out-button" onClick={handleLogout}>
                      <div className="button-text-profile">ออกจากระบบ</div>
                    </button>
                  </div>
                </Row>
              </div>
            </Row>
          </Row>
        ) : (
          <div>User not logged in</div>
        )}
      </div>
    </Container>
  );
};

export default Profile;
