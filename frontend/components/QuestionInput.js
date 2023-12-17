import React from "react";
import "./QuestionInput.css";
import ErrorText from "./ErrorText";

/* QuestionInput component renders an input field for question in form
 * formValues : values or data from the form
 * handleQuestionChange : function to handle input changes
 * handleQuestionAdd : function to add a new question
 * handleQuestionDelete : function to delete a question.
 * error : error message to display (if any)
 */
const QuestionInput = ({
  formValues,
  handleQuestionChange,
  handleQuestionAdd,
  handleQuestionDelete,
  error,
}) => {
  return (
    <div className="question-block mt-4">
      <h3 className="text-label text-question">
        เกี่ยวกับคำถามตรวจสอบความพร้อมในการรับเลี้ยง
      </h3>
      {/* mapping through each question */}
      {formValues.questionList.map((singleQuestion, index) => (
        <div key={index}>
          <div className="input-question-box mt-4">
            <p className="text-subtitle">
              คำถาม<span className="required">*</span>
            </p>

            {/* textarea for question input */}
            <textarea
              className={`input-box input-box-question ${
                error && error[index] ? "error-border" : ""
              }`}
              name="question"
              type="text"
              placeholder="คำถามที่ต้องการถามผู้ที่สนใจรับเลี้ยง"
              required
              value={singleQuestion.question}
              onChange={(event) => handleQuestionChange(event, index)} // handle input changes
              tabIndex={-1} // disable tab focus on the input field
            ></textarea>

            {/* display error text if any error occurs */}
            {error && error[index] && (
              <ErrorText errorText={error[index]} size="long"></ErrorText>
            )}

            {/* display delete button for the question if there is more than one question */}
            {formValues.questionList.length > 1 && (
              <button
                type="button"
                className="delete-question-btn"
                onClick={() => {
                  handleQuestionDelete(index);
                }}
                tabIndex={-1} // disable tab focus on the delete button
              >
                <span>ลบคำถาม</span>
              </button>
            )}
          </div>

          {/* display add button for a new question below the last question */}
          {formValues.questionList.length - 1 === index && (
            <button
              type="button"
              className="add-question-btn"
              onClick={handleQuestionAdd}
              tabIndex={-1} // disable tab focus on the add button
            >
              <span>เพิ่มคำถามใหม่</span>
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default QuestionInput;
