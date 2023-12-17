import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import ColorButton from "./ColorButton";
import Modal from "./Modal";

/* DeletePostButton component renders a button to delete post
 * postID : ID of the post to be deleted
 */
const DeletePostButton = ({ postID }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false); // state to handle modal visibility

  const newPostStatus = 2; // status for a deleted post in database
  const successTitle = "ลบการประกาศแล้ว"; // title for ConfirmSucess page

  // function to handle closing the modal
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  // function to confirm deletion
  const handleConfirm = () => {
    // update the status of post in database
    Axios.post("https://way-to-adopt.vercel.app/editPostStatus", {
      postID,
      newPostStatus,
    })
      .then((response) => {
        console.log("Response:", response.data); // log response upon successful deletion
        navigate(`/ConfirmSuccess/${successTitle}`); // navigate to success confirmation page
      })
      .catch((error) => {
        console.error("Error:", error); // log error upon fail deletion
      });
  };

  return (
    <>
      {/* button to trigger the deletion confirmation modal */}
      <ColorButton
        onClick={() => setIsModalOpen(true)}
        title="ลบประกาศ"
        color="#E77C7C"
      ></ColorButton>
      {/* modal for deletion confirmation */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onConfirm={handleConfirm}
        title="ยืนยันการลบประกาศ"
      />
    </>
  );
};

export default DeletePostButton;
