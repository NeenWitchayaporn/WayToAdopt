import React from "react";
import { FiTrash2 } from "react-icons/fi";

/* DeleteIcon component renders a delete icon
 * onClick : function to handle click events on the icon
 */
const DeleteIcon = ({ onClick }) => {
  return (
    <FiTrash2
      onClick={onClick}
      style={{
        color: "#767676",
        fontSize: "20px",
        display: "inline",
        marginLeft: "9px",
        cursor: "pointer",
      }}
    />
  );
};

export default DeleteIcon;
