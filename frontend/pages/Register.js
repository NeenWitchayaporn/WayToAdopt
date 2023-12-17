import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import "../styles/Register.css";
import Modal from "../components/Modal";
import backgroundImage from "../components/image/Regis_background.png";
import ErrorText from "../components/ErrorText";

const Register = () => {
  // state variables to store user details
  const [userGender, setUserGender] = useState("");
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userDOB, setUserDOB] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // state variables for input validation and error handling
  const [invalidInputs, setInvalidInputs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // state to handle modal visibility
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [emailExists, setEmailExists] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const navigate = useNavigate();

  // function to handle opening the modal
  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  // function to handle closing the modal
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  // function to handle the gender input change
  const handleGenderChange = (event) => {
    setUserGender(event.target.value);
  };

  // function to validate input containing only en and th alphabets
  const validateAlphabet = (input, setFunction, setErrorFunction) => {
    if (/^[A-Za-zก-๏\s]+$/.test(input) || input === "") {
      setFunction(input);
      setErrorFunction("");
    } else {
      setFunction(input);
      setErrorFunction("กรุณากรอกเป็นตัวอักษร");
    }
  };

  // function to validate input containing only number characters
  const validateNumber = (input, setFunction, setErrorFunction) => {
    if (/^\d+$/.test(input) || input === "") {
      setFunction(input);
      setErrorFunction("");
    } else {
      setFunction(input);
      setErrorFunction("กรุณากรอกเป็นตัวเลข");
    }
  };

  // function to handle the registration process (registration button click)
  const signUp = async (event) => {
    event.preventDefault();

    // additional check for empty fields
    const emptyFields = [
      "userFirstName",
      "userLastName",
      "userDOB",
      "userGender",
      "userPhone",
      "userEmail",
      "userPassword",
      "confirmPassword",
    ];

    // filter out empty fields
    const emptyFieldInputs = emptyFields.filter(
      (field) => !eval(field) || eval(field).trim() === ""
    );

    // if there are empty fields, set invalidInputs and return
    if (emptyFieldInputs.length > 0) {
      setInvalidInputs(emptyFieldInputs);
      return;
    }

    // check if passwords and confirm password match
    if (userPassword !== confirmPassword) {
      setPasswordsMatch(false);
      return;
    }

    // check if there are errors in first name, last name, phone or passwords
    if (firstNameError || lastNameError || phoneError || !passwordsMatch) {
      return;
    }

    try {
      // send a request to check if the email already exists
      const response = await Axios.post("https://way-to-adopt.vercel.app/check-email", {
        userEmail,
      });
      console.log("response.data :", response.data);
      if (response.data.success) {
        // email doesn't exitsts in database, proceed with confirmation box (modal)
        handleModalOpen();
      } else {
        // email already exists in database, set the state to true
        setEmailExists(true);
      }
    } catch (error) {
      console.log("Error during registration:", error);

      // log the detailed error information
      if (error.response) {
        console.error("Server responded with error:", error.response.data);
      }
    }
  };

  // function to handle user registration confirmation
  const handleConfirm = async () => {
    // close the confirmation pop-up
    handleModalClose();

    try {
      // send a request to register the user
      const response = await Axios.post("https://way-to-adopt.vercel.app/register", {
        userFirstName,
        userLastName,
        userDOB,
        userGender,
        userPhone,
        userEmail,
        userPassword,
        confirmPassword,
      });
      // registration successful, redirect to the Login page
      if (response.data.success) {
        navigate(`/Login`, { state: "1" });
      } else {
        console.error("Error during registration:", response.data.message);
      }
    } catch (error) {
      console.error("Error during registration:", error.message);
    }
  };
  return (
    <section
      className="background-regis"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <form onSubmit={signUp} className="content-regis">
        {/* logo */}
        <img
          src={require("../components/image/Logo_WayToAdopt.svg").default}
          alt="logo"
          className="logo-image-regis"
        />
        <div className="topic-regis">ลงทะเบียน</div>
        <div className="box-regis">
          <div className="group-regis">
            <div className="name-regis">
              ชื่อจริง (ไม่ต้องมีคำนำหน้า)
              <span className="required-regis"> *</span>
              <div className="line-regis">
                {/* change color of border when error occurs */}
                <div
                  className={`container-regis ${
                    (invalidInputs.includes("userFirstName") ||
                      firstNameError) &&
                    userFirstName.trim() === ""
                      ? "error-border"
                      : ""
                  } ${firstNameError ? "error-border" : ""}`}
                >
                  <input
                    type="text"
                    className="example-regis"
                    placeholder="ชื่อจริง"
                    value={userFirstName}
                    onChange={(event) =>
                      validateAlphabet(
                        event.target.value,
                        setUserFirstName,
                        setFirstNameError
                      )
                    }
                  />
                </div>
              </div>
              {/* display error message to user */}
              {firstNameError && (
                <ErrorText errorText={firstNameError} size="short" />
              )}
            </div>
            <div className="name-regis">
              นามสกุล<span className="required-regis"> *</span>
              <div className="line-regis">
                {/* change color of border when error occurs */}
                <div
                  className={`container-regis ${
                    (invalidInputs.includes("userLastName") ||
                      /\d/.test(userLastName)) &&
                    userLastName.trim() === ""
                      ? "error-border"
                      : ""
                  }${lastNameError ? "error-border" : ""}`}
                >
                  <input
                    type="text"
                    className="example-regis"
                    placeholder="นามสกุล"
                    value={userLastName}
                    onChange={(event) =>
                      validateAlphabet(
                        event.target.value,
                        setUserLastName,
                        setLastNameError
                      )
                    }
                  />
                </div>
              </div>
              {/* display error message to user */}
              {lastNameError && (
                <ErrorText errorText={lastNameError} size="short" />
              )}
            </div>
          </div>
          <div className="group-regis">
            <div className="name-regis">
              วันเกิด<span className="required-regis"> *</span>
              <div className="line-regis">
                {/* change color of border when error occurs */}
                <div
                  className={`container-regis ${
                    invalidInputs.includes("userDOB") && userDOB.trim() === ""
                      ? "error-border"
                      : ""
                  }`}
                >
                  <input
                    type="date"
                    className={`regis-date example-regis ${
                      !userDOB ? "not-selected" : ""
                    }`}
                    value={userDOB}
                    max={new Date().toISOString().split("T")[0]}
                    onChange={(event) => setUserDOB(event.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="name-regis">
              เลือกเพศ<span className="required-regis"> *</span>
              {/* change color of border when error occurs */}
              <select
                className={`container-1-regis ${userGender ? "selected" : ""} ${
                  invalidInputs.includes("userGender") &&
                  userGender.trim() === ""
                    ? "error-border"
                    : ""
                }`}
                onChange={handleGenderChange}
                value={userGender}
              >
                <option value="" disabled hidden className="example-regis">
                  เลือกเพศ
                </option>
                <option value="M" className="example-1-regis">
                  ชาย
                </option>
                <option value="F" className="example-1-regis">
                  หญิง
                </option>
              </select>
            </div>
          </div>
          <div className="name-regis">
            เบอร์โทรศัพท์ที่สามารถติดต่อได้
            <span className="required-regis"> *</span>
            <div className="line-regis">
              {/* change color of border when error occurs */}
              <div
                className={`container-2-regis ${
                  (invalidInputs.includes("userPhone") || phoneError) &&
                  userPhone.trim() === ""
                    ? "error-border"
                    : ""
                } ${phoneError ? "error-border" : ""}`}
              >
                <input
                  type="text"
                  className="example-regis"
                  placeholder="092 222 2222"
                  value={userPhone}
                  onChange={(event) =>
                    validateNumber(
                      event.target.value,
                      setUserPhone,
                      setPhoneError
                    )
                  }
                  maxLength={10}
                />
              </div>
            </div>
            {/* display error message to user */}
            {phoneError && <ErrorText errorText={phoneError} size="short" />}
          </div>
          <div className="name-en-regis">
            Email<span className="required-regis"> *</span>
            <div className="line-regis">
              {/* change color of border when error occurs */}
              <div
                className={`container-2-regis ${
                  invalidInputs.includes("userEmail") && userEmail.trim() === ""
                    ? "error-border"
                    : ""
                }${emailExists ? "error-border" : ""}`}
              >
                <input
                  type="email"
                  className="example-regis"
                  placeholder="example@mail.com"
                  value={userEmail}
                  onChange={(event) => {
                    setUserEmail(event.target.value);
                    setEmailExists(false);
                  }}
                />
              </div>
            </div>
            {/* display error message to user */}
            {emailExists && (
              <ErrorText
                errorText="Email นี้เคยถูกใช้ลงทะเบียนแล้ว"
                size="long"
              />
            )}
          </div>
          <div className="name-en-regis">
            Password<span className="required-regis"> *</span>
            <div className="line-regis">
              {/* change color of border when error occurs */}
              <div
                className={`container-2-regis ${
                  invalidInputs.includes("userPassword") &&
                  userPassword.trim() === ""
                    ? "error-border"
                    : ""
                }`}
              >
                <input
                  type="password"
                  className="example-regis"
                  placeholder="กรุณากรอกรหัสผ่าน"
                  value={userPassword}
                  onChange={(event) => setUserPassword(event.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="name-en-regis">
            Confirm Password<span className="required-regis"> * </span>
            <div className="line-regis">
              {/* change color of border when error occurs */}
              <div
                className={`container-2-regis ${
                  (invalidInputs.includes("confirmPassword") &&
                    confirmPassword.trim() === "") ||
                  !passwordsMatch
                    ? "error-border"
                    : ""
                }`}
              >
                <input
                  type="password"
                  className="example-regis"
                  placeholder="กรุณายืนยันรหัสผ่าน"
                  value={confirmPassword}
                  onChange={(event) => {
                    setConfirmPassword(event.target.value);
                    setPasswordsMatch(true);
                  }}
                />
              </div>
            </div>
            {/* display error message to user */}
            {!passwordsMatch && (
              <ErrorText
                errorText="รหัสผ่านไม่ตรงกัน โปรดลองอีกครั้ง"
                size="long"
              />
            )}
          </div>
          <div className="button-regis">
            <button type="submit" className="box_down">
              <div className="buttontext">ลงทะเบียน</div>
            </button>
          </div>
        </div>
        <div className="login-regis">
          หากมีบัญชีผู้ใช้งานแล้วโปรด{" "}
          <Link to="/Login">
            <span className="click-regis">เข้าสู่ระบบ</span>
          </Link>
        </div>
      </form>
      {/* modal for ending confirmation */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onConfirm={handleConfirm}
        title="ยืนยันการลงทะเบียน"
      />
    </section>
  );
};

export default Register;
