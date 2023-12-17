import React from "react";
import "./ErrorText.css";

/* ErrorText component displays error messages with different sizes
 * errorText : error message to be displayed
 * size : size of the error text ('short' or 'long')
 */
const ErrorText = ({ errorText, size }) => {
  let errorTextClass = "error-text"; // assign default CSS class for error text

  // modify the CSS class based on the 'size' prop
  if (size === "short") {
    errorTextClass += " short-error-text";
  } else if (size === "long") {
    errorTextClass += " long-error-text";
  }

  return (
    <div className="error-container">
      {/* display error icon in front of error text */}
      <span className="error-icon">
        <img
          src={require("./image/error-alert.svg").default}
          alt="error-icon"
        />
      </span>
      {/* display error text with specified class */}
      <span className={errorTextClass}>{errorText}</span>
    </div>
  );
};

export default ErrorText;
