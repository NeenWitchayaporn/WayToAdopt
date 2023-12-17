import React from "react";
import "./RadioInput.css";

/* RadioInput component renders a group of radio input for form
 * label : label for the radio group
 * name : name for the radio group
 * example : example for the radio group
 * options : array of objects containing radio options
 * handleChange : function to handle input changes in the radio group
 * isRequired : boolean used to indicates whether the field is required or not
 */
const RadioInput = ({
  label,
  name,
  example,
  options,
  handleChange,
  isRequired,
}) => {
  return (
    <div className="form-group">
      <label className="text-subtitle mt-3 mb-2">
        {label} {/* label for the input field */}
        {isRequired && <span className="required">*</span>}{" "}
        {/* display asterisk (*) for required fields */}
        {example && <span className="text-example">{example}</span>}{" "}
        {/* display example (if any) */}
      </label>

      <div className="radio-group mb-2">
        {/* mapping through each option */}
        {options.map((option) => (
          <div className="radio-component" key={option.value}>
            <input
              className="input-radio"
              type="radio"
              name={name}
              value={option.value}
              id={option.id}
              // Set defaultChecked based on each option's defaultChecked property
              defaultChecked={option.defaultChecked ? true : false}
              onChange={handleChange} // handle input changes
              required={isRequired} // set input as required (if specified)
              tabIndex={-1} // disable tab focus on the input field
            />
            {/* label for each radio option */}
            <label className="text-radio" htmlFor={option.id}>
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};
export default RadioInput;
