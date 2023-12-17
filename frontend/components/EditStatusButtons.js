import React, { useState, useEffect } from "react";
import Axios from "axios";
import ViewResultButton from "../components/ViewResultButton";
import EndPostButton from "./EndPostButton";
import DeletePostButton from "./DeletePostButton";

/* EditStatusButtons component renders different group of buttons based on status of post
 * postID : ID of the post to be deleted
 * onChange : function to handle change events (used to handle change of button load state in main page)
 */
const EditStatusButtons = ({ postID, onChange }) => {
  const [postData, setPostData] = useState([]); // state to store post data
  const [loadingButton, setLoadingButton] = useState(true); // state to handle loading state

  // fetch post data based on postID
  useEffect(() => {
    setLoadingButton(true); // set loading state to true
    Axios.get(`https://way-to-adopt.vercel.app/read/${postID}`).then((response) => {
      setPostData(response.data); // set fetched post data
      setLoadingButton(false); // set loading state to false
      onChange(false); // trigger onChange function with false argument
    });
  }, [postID, onChange]);

  // render different group of buttons based on post status
  if (!loadingButton && postData.PostStatus === 1) {
    // if post status is 1 (ended post), render ViewResultButton and DeletePostButton
    return (
      <>
        <ViewResultButton postID={postID} />
        <DeletePostButton postID={postID} />
      </>
    );
  } else if (!loadingButton && postData.PostStatus === 0) {
    // if post status is 0 (ongoing post), render ViewResultButton, EndPostButton, and DeletePostButton
    return (
      <>
        <ViewResultButton postID={postID} />
        <EndPostButton postID={postID} />
        <DeletePostButton postID={postID} />
      </>
    );
  } else {
    // if still loading or post status is different, no buttons rendered
    return null;
  }
};

export default EditStatusButtons;
