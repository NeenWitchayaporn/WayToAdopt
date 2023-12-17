import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import ColorButton from "./ColorButton";
import Modal from "./Modal";

/* RefuseButton component renders a button to refuse adoption
 * adoptID - ID of the adoption to be refused.
 */
const RefuseButton = ({ adoptID }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false); // state to handle modal visibility

  const successTitle = "ปฏิเสธการตอบกลับแล้ว"; // title for ConfirmSucess page

  // Function to handle closing the modal
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  // Function to confirm refusing the adoption
  const handleConfirm = () => {
    // update the status of adoption in database
    Axios.post("https://way-to-adopt.vercel.app/editAdoptStatus", { adoptID })
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
      {/* button to trigger the refusing confirmation modal */}
      <ColorButton
        onClick={() => setIsModalOpen(true)}
        title="ปฏิเสธการตอบกลับ"
        color="#E77C7C"
      ></ColorButton>
      {/* modal for refusing confirmation */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onConfirm={handleConfirm}
        title="ยืนยันการปฏิเสธการตอบกลับ"
      />
    </>
  );
};

export default RefuseButton;
