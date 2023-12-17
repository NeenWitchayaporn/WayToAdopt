/* this express app defines a route for retrieving pet post created by specific user
 * it connects to firestore using the admin SDK to query the "Post" collection
 * the route expects a userID parameter in the request URL, which is used to filter the previous owner of the pet post
 * the available pet post are ordered by their PostStatus and PostID, and returned as a json array in the response
 */

const express = require("express");
const admin = require("./firebase");
const db = admin.firestore();
const app = express();

// fetch details of all pet posts based on userID
app.get("/read/allpost/:userID", async (req, res) => {
  try {
    const userID = parseInt(req.params.userID); // get userID from request parameters

    const postCol = db.collection("Post"); // access the "Post" collection in firestore

    const deletedPostStatus = 2; // define status for deleted posts

    // Create a query to filter posts based on userID and status
    const query = postCol
      .where("PreviousOwnerID", "==", userID)
      .where("PostStatus", "!=", deletedPostStatus) // exclude deleted posts
      .orderBy("PostStatus")
      .orderBy("PostID");

    // execute the query and get a snapshot of the result
    const querySnapshot = await query.get();
    let postData = [];
    // iterating through query snapshot and push each post's data to the response data
    querySnapshot.forEach((doc) => {
      postData.push(doc.data());
    });
    // Send all post data in the response
    res.send(postData);
  } catch (error) {
    res.send(error);
  }
});

module.exports = app;
