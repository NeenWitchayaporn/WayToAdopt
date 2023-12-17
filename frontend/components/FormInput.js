import React from "react";
import "./FormInput.css";
import ErrorText from "./ErrorText";

/* FormInput component renders an input field for form
 * label : label for the input field
 * name : name and identifier (id) for the input field
 * type : type of input ('text' or 'date')
 * handleChange : function to handle input change events
 * isRequired : boolean used to indicates whether the field is required or not
 * error : error message to display (if any)
 */
const FormInput = ({ label, name, type, handleChange, isRequired, error }) => {
  const currentDate = new Date().toLocaleDateString("fr-ca"); // current date with 'yyyy-mm-dd' format
  const minDate = new Date();
  minDate.setFullYear(minDate.getFullYear() - 50); // set minimum date (50 years ago)
  const minDateString = minDate.toLocaleDateString("fr-ca"); // minimum date with 'yyyy-mm-dd' format
  return (
    <div className="form-group">
      {/* label for the input field */}
      <label className="text-subtitle mt-3 mb-2" htmlFor={name}>
        {label}
        {/* display asterisk (*) for required fields */}
        {isRequired && <span className="required">*</span>}
      </label>
      <input
        className={`input-box ${
          name === "postTitle" ? "input-box-long" : "input-box-short" // display input with specified style
        } ${error ? "error-border" : ""}`} // change style if any error occurs
        name={name}
        id={name}
        type={type}
        placeholder={type === "text" ? label : null} // set placeholder if the type is 'text'
        max={(type = "date" ? currentDate : null)} // set maximum date if the type is 'date'
        min={(type = "date" ? minDateString : null)} // set minimum date if the type is 'date'
        onChange={handleChange} // handle input changes
        required={isRequired} // set input as required (if specified)
        tabIndex={-1} // disable tab focus on the input field
      />
      {/* display error text if any error occurs */}
      {error && (
        <ErrorText
          errorText={error}
          size={name === "postTitle" ? "long" : "short"}
        ></ErrorText>
      )}
    </div>
  );
};
export default FormInput;
