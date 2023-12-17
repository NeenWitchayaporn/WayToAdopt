import React from "react";
import { Col } from "react-bootstrap";
import "./PageTitle.css";

/* PageTitle component displays specified title for page
 * title : title to be displayed
 */
const PageTitle = ({ title }) => {
  return (
    <Col md={12}>
      <h3 className="text-start">{title}</h3>
    </Col>
  );
};

export default PageTitle;
