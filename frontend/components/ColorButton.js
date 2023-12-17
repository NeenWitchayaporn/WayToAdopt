import React from "react";
import "./Button.css";

/* ColorButton component renders a color button with a specified style
 * onClick : function to handle click event on the button
 * title : title or text displayed on the button
 * color : background color of the button
 */
const ColorButton = ({ onClick, title, color }) => {
  // define the style of background color based on 'color' prop
  const buttonColor = {
    backgroundColor: color,
  };
  return (
    // render a button element with specified styles and onClick function
    <button
      type="button"
      className="color-btn"
      style={buttonColor}
      onClick={onClick}
    >
      <span>{title}</span>
    </button>
  );
};
export default ColorButton;
