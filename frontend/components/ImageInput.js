import React from "react";
import UploadIcon from "./UploadIcon";
import DeleteIcon from "./DeleteIcon";
import "./ImageInput.css";
import ErrorText from "./ErrorText";

/* ImageInput component renders an image file input field for form
 * formValues : values or data from the form
 * handleFileChange : function to handle file changes
 * handleFileReset : function to reset the selected file
 * error : error message to display (if any)
 */
const ImageInput = ({
  formValues,
  handleFileChange,
  handleFileReset,
  error,
}) => {
  return (
    <div className="form-group">
      {/* title for the image input */}
      <p className="text-pic mt-4">ภาพถ่ายของสัตว์</p>

      {/* container for uploading image */}
      <div
        className="upload-box"
        onClick={() => document.querySelector(".input-file").click()}
      >
        {/* input field for image file */}
        <input
          id="petPic"
          accept="image/jpeg, image/png"
          className="input-file"
          type="file"
          onChange={handleFileChange} // handle file changes
        />

        {formValues.image ? (
          // display selected image if there's an selected image
          <div className="picture-container">
            <img
              src={formValues.image}
              className="upload-pic"
              alt={formValues.fileName}
            ></img>
          </div>
        ) : (
          // display upload area
          <div>
            <UploadIcon></UploadIcon>
            <p className="upload-text">เลือกไฟล์รูปภาพ</p>
            <p className="upload-text-example">
              (.jpeg .jpg หรือ .png เท่านั้น)
            </p>
          </div>
        )}
      </div>

      <div className={`uploaded-box ${error ? "error-border" : ""}`}>
        {formValues.image ? (
          // display an image file name if there's an selected image
          <div className="uploaded-content">
            <p className="uploaded-text">{formValues.fileName}</p>
            <DeleteIcon onClick={handleFileReset} />{" "}
            {/* display delete icon used to reset the selected file */}
          </div>
        ) : (
          // display an initailed text
          <div className="uploaded-content">
            <p className={`uploaded-text ${error ? "error" : ""}`}>
              {" "}
              {/*  change style if any error occurs */}
              {formValues.fileName}
            </p>
          </div>
        )}
      </div>
      {/* display error text if any error occurs */}
      {error && <ErrorText errorText={error} size="short"></ErrorText>}
    </div>
  );
};

export default ImageInput;
