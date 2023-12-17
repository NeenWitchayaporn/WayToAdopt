import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import ColorButton from "./ColorButton";
import Modal from "./Modal";

/* EndPostButton component renders a button to end post
 * postID : ID of the post to be ended
 */
const EndPostButton = ({ postID }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false); // state to handle modal visibility

  const newPostStatus = 1; // status for a ended post in database
  const successTitle = "สิ้นสุดการประกาศแล้ว"; // title for ConfirmSucess page

  // function to handle closing the modal
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  // function to confirm ending the post
  const handleConfirm = () => {
    // update the status of post in database
    Axios.post("https://way-to-adopt.vercel.app/editPostStatus", {
      postID,
      newPostStatus,
    })
      .then((response) => {
        console.log("Response:", response.data); // log response upon successful ending
        navigate(`/ConfirmSuccess/${successTitle}`); // navigate to success confirmation page
      })
      .catch((error) => {
        console.error("Error:", error); // log error upon fail ending
      });
  };

  return (
    <>
      {/* button to trigger the ending confirmation modal */}
      <ColorButton
        onClick={() => setIsModalOpen(true)}
        title="สิ้นสุดการประกาศ"
        color="#85D9A7"
      ></ColorButton>
      {/* modal for ending confirmation */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onConfirm={handleConfirm}
        title="ยืนยันการสิ้นสุดประกาศ"
      />
    </>
  );
};

export default EndPostButton;
