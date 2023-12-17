import React from "react";
import "./SelectInput.css";

/* SelectInput component renders a select input field for form
 * label : label for the select input
 * name : name for the select input
 * defaultValue : default value for the select input.
 * options : array of objects containing options for the select input
 * handleChange : function to handle input change events
 * isRequired : boolean used to indicates whether the field is required or not
 */
const SelectInput = ({
  label,
  name,
  defaultValue,
  options,
  handleChange,
  isRequired,
}) => {
  return (
    <div className="form-group">
      {/* label for the select input */}
      <label className="text-subtitle mb-2" htmlFor={name}>
        {label}
        {/* display asterisk (*) for required fields */}
        {isRequired && <span className="required">*</span>}
      </label>
      <select
        className="custom-select"
        name={name}
        id={name}
        defaultValue={defaultValue}
        required={isRequired} // set input as required (if specified)
        onChange={handleChange} // handle input changes
      >
        {/* mapping through each option */}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
        tabIndex={-1}
      </select>
    </div>
  );
};
export default SelectInput;
