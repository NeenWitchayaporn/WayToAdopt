import React from "react";
import { useNavigate } from "react-router-dom";
import "./Button.css";

// GoBackButton component renders a button to go back to the previous page
const GoBackButton = () => {
  const navigate = useNavigate();
  // display a button to navigate back in the browser history
  return (
    <button type="button" className="back-btn" onClick={() => navigate(-1)}>
      <span>ย้อนกลับ</span>
    </button>
  );
};

export default GoBackButton;
