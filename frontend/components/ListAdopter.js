import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Row, Col, Container } from "react-bootstrap";
import "./ListAdopter.css";
import ManageAdopterButtons from "../components/MangeAdopterButtons";

/* ListAdopter component renders list of adopters and group of buttons based on status of adoption
 * postID : ID of the post to be listed
 * adoptStatus : status of adoption to display
 */
const ListAdopter = ({ postID, adoptStatus }) => {
  const [adopterData, setAdopterData] = useState([]); // state to store adopter data
  const [loading, setLoading] = useState(true); // state to handle loading state
  const [loadingAdopter, setLoadingAdopter] = useState(true); // state to handle adopter loading state

  const hasAdopter = adopterData.length > 0; // check whether there are any adopters

  // fetch adopter data based on post ID and adoption status
  useEffect(() => {
    setLoadingAdopter(true); // set loading state to true
    Axios.get(
      `https://way-to-adopt.vercel.app/read/post/adopter/${postID}/${adoptStatus}`
    ).then((response) => {
      setAdopterData(response.data); // set fetched adopter data
      setLoadingAdopter(false); // set loading state to false
    });
  }, [postID, adoptStatus]);

  // function to handle the change in button loading state
  const handleLoadButtonChange = (loadingButton) => {
    setLoading(loadingAdopter || loadingButton);
  };

  return (
    <Container>
      {!loadingAdopter && hasAdopter
        ? // if there are adopters, render adopter data (first name , last name)
          adopterData.map((adopter) => (
            <Row key={adopter.AdopterID}>
              {!loading && (
                <Col md={6}>
                  <div className="adopter-box">
                    <p className="adopter-text">{adopter.AdopterFirstName}</p>
                    <p className="adopter-text">{adopter.AdopterLastName}</p>
                  </div>
                </Col>
              )}
              <Col md={6}>
                {/* render buttons for linking to another page and managing adopter */}
                <div className="button-container">
                  <ManageAdopterButtons
                    adoptID={adopter.AdoptID}
                    adopterID={adopter.AdopterID}
                    showViewButton={true}
                    onChange={handleLoadButtonChange}
                  />
                </div>
              </Col>
            </Row>
          ))
        : !loadingAdopter && (
            // If no adopters, show a message
            <Row>
              <Col md={12}>
                <div className="no-post-box">
                  <p className="no-post-text">ยังไม่มีการตอบกลับ</p>
                </div>
              </Col>
            </Row>
          )}
    </Container>
  );
};

export default ListAdopter;
