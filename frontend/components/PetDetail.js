import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import "./PetDetail.css";
import CalculateAge from "./CalculateAge";
import RenderVaccinationStatus from "./RenderVaccinationStatus";
import RenderSterilizationStatus from "./RenderSterilizationStatus";
import RenderWeaningStatus from "./RenderWeaningStatus";
import RenderHousebreakingStatus from "./RenderHouseBreakingStatus";

/* PetDetail component renders a block containing pet details in post based on the postID
 * postID : ID of the post
 */

const PetDetail = ({ postID }) => {
  const [postData, setPostData] = useState([]); // state to store post data
  const [loading, setLoading] = useState(true); // state to handle loading state

  // fetch post data based on postID
  useEffect(() => {
    setLoading(true); // set loading state to true
    Axios.get(`https://way-to-adopt.vercel.app/read/${postID}`).then((response) => {
      setPostData(response.data); // state to store post data
      setLoading(false); // set loading state to false
    });
  }, [postID]);

  return (
    <Container className="main-container">
      <Row>
        {/* display a picture of pet */}
        <Col md={4} className="pet-pic-container">
          {!loading && (
            <img className="pet-pic" src={postData.PetPic} alt="รูปสัตว์" />
          )}
        </Col>
        {/* display pet detail */}
        <Col md={8}>
          <Container className="no-padding-container">
            <div className="post-block">
              {/* display post title */}
              <Row>
                <div className="top-text">
                  <p className="text-title">หัวข้อประกาศ</p>
                  <p className="text-postInfo">{postData.PostTitle}</p>
                </div>
              </Row>
              <Row>
                {/* display pet type */}
                <Col>
                  <div className="left-column">
                    <p className="text-title">ประเภทสัตว์เลี้ยง</p>
                    <p className="text-postInfo">{postData.PetTypeName}</p>
                  </div>
                </Col>
                {/* display pet breed */}
                <Col>
                  <div className="right-column">
                    <p className="text-title">พันธุ์สัตว์เลี้ยง</p>
                    <p className="text-postInfo">{postData.PetBreed || "-"}</p>
                  </div>
                </Col>
              </Row>
              <Row>
                {/* display pet's age */}
                <Col>
                  <div className="left-column">
                    <p className="text-title">อายุ</p>
                    <p className="text-postInfo">
                      {CalculateAge(postData.PetDOB)}
                      {/* use CalculateAge function to calculate pet's age from its date of birth */}
                    </p>
                  </div>
                </Col>
                {/* display pet gender */}
                <Col>
                  <div className="right-column">
                    <p className="text-title">เพศของสัตว์</p>
                    <p className="text-postInfo">
                      {postData.PetGender === "M"
                        ? "เพศผู้"
                        : postData.PetGender === "F"
                        ? "เพศเมีย"
                        : "-"}
                    </p>
                  </div>
                </Col>
              </Row>
              <Row>
                {/* display pet's vaccination status */}
                <Col>
                  <div className="left-column">
                    <p className="text-title">การรับการรักษา</p>
                    <p className="text-postInfo">
                      {RenderVaccinationStatus(postData.PetVaccinated)}
                      {/* use RenderVaccinationStatus function to get pet's vaccination status */}
                    </p>
                  </div>
                </Col>
                {/* display pet's sterilization status */}
                <Col>
                  <div className="right-column">
                    <p className="text-title">การทำหมัน</p>
                    <p className="text-postInfo">
                      {RenderSterilizationStatus(postData.PetSterilized)}
                      {/* use RenderSterilizationStatus function to get pet's sterilization status */}
                    </p>
                  </div>
                </Col>
              </Row>
              <Row>
                {/* display pet's weaning status */}
                <Col>
                  <div className="left-column">
                    <p className="text-title">การหย่านม</p>
                    <p className="text-postInfo">
                      {RenderWeaningStatus(postData.PetWean)}
                      {/* use RenderWeaningStatus function to get pet's weaning status */}
                    </p>
                  </div>
                </Col>
                {/* display pet's housebreaking status */}
                <Col>
                  <div className="right-column">
                    <p className="text-title">การฝึกฝนการขับถ่าย</p>
                    <p className="text-postInfo">
                      {RenderHousebreakingStatus(postData.PetHousebreaking)}
                      {/* use RenderHousebreakingStatus function to get pet's housebreaking status */}
                    </p>
                  </div>
                </Col>
              </Row>
              {/* display more pet's detail */}
              <Row>
                <div className="bottom-text">
                  <p className="text-title">รายละเอียดอื่น ๆ</p>
                  <p className="text-postInfo">{postData.PetDetail || "-"}</p>
                </div>
              </Row>
            </div>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default PetDetail;
