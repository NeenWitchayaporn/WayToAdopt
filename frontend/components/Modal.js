import React from "react";
import "./Modal.css";

/* Modal component renders a simple modal with customizable title
 * isOpen : boolean to determine whether the modal is open or closed
 * onClose : function to close the modal
 * onConfirm : function to handle the confirmation action
 * title : title or text displayed in the modal
 */
const Modal = ({ isOpen, onClose, onConfirm, title }) => {
  return (
    <div className="modal" style={{ display: isOpen ? "flex" : "none" }}>
      <div className="modal-content">
        <div className="modal-title">
          <span>{title}</span>
        </div>
        <div className="footer">
          {/* button to close the modal */}
          <button
            onClick={() => {
              onClose();
            }}
            className="modal-button modal-cancel-button"
          >
            ยกเลิก
          </button>
          {/* button to confirm */}
          <button
            onClick={onConfirm}
            className="modal-button modal-confirm-button"
          >
            ยืนยัน
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
