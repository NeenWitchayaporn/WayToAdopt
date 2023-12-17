import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import "../styles/Introduction.css";
import backgroundImage from "../components/image/background_intro_canva2.jpg";
import logoIcon from "../components/image/logo.svg";
import SubmitButton from "../components/SubmitButton";

// Introduction component renders a page for the introduction section
const Introduction = () => {
  return (
    <section
      className="intro-background"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <Container>
        <Row>
          <Col md={4}></Col>
          <Col md={8}>
            <Container className="intro-content">
              {/* logo */}
              <Row>
                <Col className="intro-logo">
                  <img src={logoIcon} alt="logo" />
                </Col>
              </Row>
              {/* Introduction text */}
              <Row>
                <div className="intro-text">
                  สัตว์เลี้ยงคู่ใจ หาได้ที่นี่
                  <br />
                  สนับสนุนทุกชีวิตให้มีสิทธิ์มีบ้าน
                </div>
              </Row>

              <Row>
                <div className="intro-button">
                  {/* links to Login and Register page */}
                  <Link to="/Login" className="link-style">
                    <SubmitButton title="เข้าสู่ระบบ"></SubmitButton>
                  </Link>
                  <Link to="/Register" className="link-style">
                    <SubmitButton
                      title="ลงทะเบียน"
                      className="SubmitButton"
                    ></SubmitButton>
                  </Link>
                </div>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Introduction;
