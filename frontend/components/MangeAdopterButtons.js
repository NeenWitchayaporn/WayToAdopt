import React, { useState, useEffect } from "react";
import Axios from "axios";
import ViewAnswerButton from "../components/ViewAnswerButton";
import ContactButton from "./ContactButton";
import RefuseButton from "../components/RefuseButton";

/* ManageAdopterButtons component renders different group of buttons based on adopt and post status
 * adoptID : ID of the adoption
 * adopterID : ID of the adopter
 * showViewButton : boolean used to indicates whether the View Answer button should be displayed or not
 * onChange : function to handle change events (used to handle change of button load state in main page)
 */
const ManageAdopterButtons = ({
  adoptID,
  adopterID,
  showViewButton,
  onChange = () => {},
}) => {
  const [adoptData, setAdoptData] = useState([]); // state to store adopt data
  const [loadingButton, setLoadingButton] = useState(true); // state to handle loading state

  // fetch adopt data based on adoptID
  useEffect(() => {
    setLoadingButton(true); // set loading state to true
    Axios.get(`https://way-to-adopt.vercel.app/read/adopt/${adoptID}`).then(
      (response) => {
        setAdoptData(response.data); // state to store adopter data
        setLoadingButton(false); // set loading state to false
        onChange(false); // trigger onChange function with false argument
      }
    );
  }, [adoptID]);

  // render different group of buttons based on adoption status and post status
  if (
    !loadingButton &&
    adoptData.AdoptStatus === 0 &&
    adoptData.PostStatus === 0
  ) {
    /* if adoption status is 0 (pending adoption) and post status is 0 (ongoing post),
     * render ViewAnswerButton, ContactButton, and RefuseButton
     */
    return (
      <>
        {showViewButton && (
          <ViewAnswerButton
            adoptID={adoptID}
            adopterID={adopterID}
            color="#95C0DE"
          />
        )}
        <ContactButton adopterID={adopterID} />
        <RefuseButton adoptID={adoptID} />
      </>
    );
  } else if (!loadingButton && adoptData.AdoptStatus === 1) {
    // if adoption status is 1 (refused adoption), render ViewAnswerButton
    return (
      <>
        {showViewButton && (
          <ViewAnswerButton
            adoptID={adoptID}
            adopterID={adopterID}
            color="#9f9f9f"
          />
        )}
      </>
    );
  } else if (!loadingButton && adoptData.PostStatus === 1) {
    // if post status is 1 (ended post), render ViewAnswerButton
    return (
      <>
        {showViewButton && (
          <ViewAnswerButton
            adoptID={adoptID}
            adopterID={adopterID}
            color="#95C0DE"
          />
        )}
      </>
    );
  } else {
    // if still loading or conditions aren't met, no buttons rendered
    return null;
  }
};

export default ManageAdopterButtons;
