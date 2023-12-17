import React from "react";
import "./SearchRadioInput.css";

/* RadioInput component renders a group of radio input for search form
 * label : label for the radio group
 * name : name for the radio group
 * options : array of objects containing radio options
 * handleChange : function to handle input changes in the radio group
 * isSpan : boolean used to indicates whether the field style is span or not
 */
const SearchRadioInput = ({ label, name, options, handleChange, isSpan }) => {
  return (
    <div className="form-group">
      {/* label for the input field */}
      <label className="text-search-radio-subtitle mt-3 mb-2">{label}</label>

      <div
        className={`radio-search-group ${
          isSpan ? "radio-group-span" : ""
        } mb-2`}
      >
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
            />
            {/* label for each radio option */}
            <label className="text-search-radio" htmlFor={option.id}>
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchRadioInput;
