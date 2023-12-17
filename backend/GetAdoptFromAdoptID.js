/* this express app defines a route for retrieving details of a specific adoption
 * it connects to firestore using the admin SDK to query the "Adopt" and "Post" collections
 * the route expects a adoptID parameter in the request url, which is used to filter the adoption
 * the details of the adoption, including PostStatus from the "Post" collection, are returned in the response
 */

const express = require("express");
const admin = require("./firebase");
const db = admin.firestore();
const app = express();

// fetch details of a specific adoption based on adoptID
app.get("/read/adopt/:adoptID", async (req, res) => {
  try {
    const adoptID = parseInt(req.params.adoptID); // get adoptID from the request parameters

    const adoptCol = db.collection("Adopt"); // access the "Adopt" collection in firestore

    // create a query to filter adoption based on adoptID and limit the result to 1
    const query = adoptCol.where("AdoptID", "==", adoptID).limit(1);

    // execute the query and get a snapshot of the result
    const querySnapshot = await query.get();
    const adoptData = querySnapshot.docs[0].data();

    const postID = adoptData.PostID;
    // accessing the "Post" collection in firestore and create a query to filter based on postID
    const postQuery = db
      .collection("Post")
      .where("PostID", "==", postID)
      .limit(1);
    const postQuerySnapshot = await postQuery.get();

    if (!postQuerySnapshot.empty) {
      // if post document is found, add post status to the adoption data
      const postData = postQuerySnapshot.docs[0].data();
      adoptData.PostStatus = postData.PostStatus;
    } else {
      console.log("Post document not found");
    }

    // send the adoption data with post status in the response
    res.send(adoptData);
  } catch (error) {
    res.send(error);
  }
});

module.exports = app;
