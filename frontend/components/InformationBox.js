import React from "react";
import { Col, Row } from "react-bootstrap";
import "./InformationBox.css";

/* InformationBox component renders an information box in Petcard with data of post
 * attribute : title of attribute
 * value : value of attribute
 */
const InformationBox = ({ attribute, value }) => {
  return (
    <Row>
      {/* render attribute */}
      <Col className="attribute" md={8}>
        <p>{attribute}</p>
      </Col>
      {/* render value */}
      <Col className="value" md={4}>
        <p>{value}</p>
      </Col>
    </Row>
  );
};

export default InformationBox;
