/* this express app handles the editing of post status of the specific pet post
 * it updates the firestore database with new post status
 * it expects a POST request with the following data
 *
 * postID : the ID of the pet post to be edited
 * newPostStatus : the new value of post status
 */

const express = require("express");
const admin = require("./firebase");
const db = admin.firestore();
const app = express();

// edit the pet post status with specified value
app.post("/editPostStatus", async (req, res) => {
  try {
    const postID = req.body.postID; // get postID from the request body
    const newPostStatus = req.body.newPostStatus; // get new post status from the request body

    const postCol = db.collection("Post"); // access the "Post" collection in Firestore

    // create a query to filter pet post based on postID and limit the result to 1
    const query = postCol.where("PostID", "==", postID).limit(1);
    const querySnapshot = await query.get();

    if (!querySnapshot.empty) {
      // if post document is found, update post status
      const docID = querySnapshot.docs[0].id;
      await postCol.doc(docID).update({ PostStatus: newPostStatus });
      res.status(200).json({ success: true }); // respond with success status
    } else {
      console.log("Pet document not found");
    }
  } catch (error) {
    res.send(error);
  }
});

module.exports = app;
