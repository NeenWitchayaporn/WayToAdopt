import React from "react";
import { Link } from "react-router-dom";
import ColorButton from "./ColorButton";

/* ContactButton component renders a button to link to adopter contact page
 * adopterID : ID of the adopter to chat with
 */
const ContactButton = ({ adopterID }) => {
  return (
    // Link to the Chat page with associated state
    <Link to={`/AdopterContact`} state={{ adopterID }} tabIndex={-1}>
      <ColorButton title="ติดต่อผู้รับเลี้ยง" color="#85D9A7"></ColorButton>
    </Link>
  );
};

export default ContactButton;
