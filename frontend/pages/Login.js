import React, { useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import Axios from "axios";
import { Row, Container } from "react-bootstrap";
import "../styles/Login.css";
import backgroundImage from "../components/image/Login_background_canva.jpg";
import ErrorText from "../components/ErrorText";

// login using email and password from firebase database
const Login = () => {
  // get the status from the location state
  const location = useLocation();
  const state = location.state;
  const status = state;

  const [email, setEmail] = useState(""); // state to store email input
  const [password, setPassword] = useState(""); // state to store password input
  const [emailError, setEmailError] = useState(null); // State to check email input for errors
  const [passwordError, setPasswordError] = useState(null); // State to check password input for errors

  const [loggedIn, setLoggedIn] = useState(false); // State to track whether the user is logged in or not
  const [yourIdToken, setYourIdToken] = useState(""); // State to store the user's ID token

  // check whether there is a success status or not
  const registerSuccess = status === "1";
  const logoutSuccess = status === "2";
  const notLogin = status === "3";

  // function to handle the log-in process
  const signIn = async (event) => {
    event.preventDefault();

    if (!email) {
      setEmailError({
        message: "กรุณากรอก Email",
      });
    } else if (!password) {
      setPasswordError({
        message: "กรุณากรอกรหัสผ่าน",
      });
    }

    // send a login request to the server
    try {
      const response = await Axios.post("https://way-to-adopt.vercel.app/login", {
        email,
        password,
      });

      // check if authentication was successful
      if (response.data.success) {

        // extract and store the user's ID token
        const idToken = response.data.customToken;
        setYourIdToken(idToken);

        localStorage.setItem("yourIdToken", idToken); // store the ID token in local storage
        setLoggedIn(true); // set loggedIn to true after successful login
      } else {
        // handle different authentication error scenarios for showing error message
        console.error("Authentication error:", response.data.error);

        if (response.data.emailExists) {
          // set password error message to display when error
          setPasswordError({
            message: "Email หรือ รหัสผ่านไม่ถูกต้อง โปรดลองอีกครั้ง",
          });
        } else if (response.data.passwordError) {
          // set password error message to display when error
          setPasswordError({
            message: response.data.passwordError.message,
          });
        } else {
          setPasswordError(null);
          // set email error message to display when error
          setEmailError({
            message: "Email นี้ยังไม่ได้ลงทะเบียน โปรดลงทะเบียน",
          });
        }
      }
    } catch (error) {
      // handle any errors that occur during the login process
      console.error("Error during login:", error.message);
    }
  };

  // redirect to home page if the user is logged in
  if (loggedIn) {
    return <Navigate to="/Home" />;
  }

  return (
    <section
      className="background-login"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <Container className="login-page">
        <form onSubmit={signIn} className="content-login">
          {/* logo */}
          <Row>
            <img
              src={require("../components/image/Logo_WayToAdopt.svg").default}
              alt="first logo"
              className="logo-login"
            />
          </Row>
          <Row>
            <div className="topic-login">เข้าสู่ระบบ</div>
            {registerSuccess ? (
              <div className="green-box">การลงทะเบียนเสร็จสมบูรณ์</div>
            ) : (
              <></>
            )}
            {logoutSuccess ? (
              <div className="red-box">คุณได้ทำการออกจากระบบ</div>
            ) : (
              <></>
            )}
            {notLogin ? (
              <div className="red-box">กรุณาเข้าสู่ระบบก่อนการใช้งาน</div>
            ) : (
              <></>
            )}
          </Row>
          <Row>
            <div className="box-login">
              <Row>
                <div className="name-en-login">
                  Email<span className="required-login"> *</span>
                  <div className="line-login">
                    <div
                      className={`container-2-login ${
                        emailError ? "error-border" : ""
                      }`}
                    >
                      <input
                        type="email"
                        className="example-login"
                        placeholder="example@mail.com"
                        value={email}
                        onChange={(event) => {
                          setEmail(event.target.value);
                          setEmailError("");
                        }}
                      />
                    </div>
                  </div>
                  {/* display error from email */}
                  {emailError && (
                    <ErrorText errorText={emailError.message} size="long" />
                  )}
                </div>
              </Row>
              <Row>
                <div className="name-en-login">
                  Password<span className="required-login"> *</span>
                  <div className="line-login">
                    <div
                      className={`container-2-login ${
                        passwordError ? "error-border" : ""
                      }`}
                    >
                      <input
                        type="password"
                        className="example-login"
                        placeholder="กรุณากรอกรหัสผ่าน"
                        value={password}
                        onChange={(event) => {
                          setPassword(event.target.value);
                          setPasswordError("");
                        }}
                      />
                    </div>
                  </div>
                  {/* display error from password */}
                  {passwordError && (
                    <ErrorText errorText={passwordError.message} size="long" />
                  )}
                </div>
              </Row>
              {/* login button */}
              <Row>
                <div className="button-login">
                  <button type="submit" className="box-down-login">
                    <div className="buttontext">เข้าสู่ระบบ</div>
                  </button>
                </div>
              </Row>
            </div>
          </Row>
          {/* redirect to register page */}
          <Row>
            <div className="login-login">
              หากยังไม่มีบัญชี โปรด{" "}
              <Link to="/Register">
                <span className="click-login">ลงทะเบียน</span>
              </Link>
            </div>
          </Row>
        </form>
      </Container>
    </section>
  );
};

export default Login;
