/* this express app defines a route for retrieving questions related to a specific pet post
 * it connects to firestore using the admin sdk to query the "PostQuestion" collection
 * the route expects a postID parameter in the request url, which is used to filter the questions for the specific pet post
 * the questions are ordered by their unique identifier (PostQID) and returned as a json array in the response
 */

const express = require("express");
const admin = require("./firebase");
const db = admin.firestore();
const app = express();

// fetch questions related to a specific pet post based on postID
app.get("/questions/:postID", async (req, res) => {
  try {
    const postID = parseInt(req.params.postID); // get postID from the request parameters

    const postQA = db.collection("PostQuestion"); // access the "PostQuestion" collection in Firestore

    // query to filter all post questions based on postID
    const query = postQA.where("PostID", "==", postID).orderBy("PostQID");
    // execute the query and get a snapshot of the result
    const querySnapshot = await query.get();
    let qaData = [];
    // iterating through query snapshot and push each question's data to the question data
    querySnapshot.forEach((doc) => {
      qaData.push(doc.data());
    });
    // send the question data in the response
    res.send(qaData);
  } catch (error) {
    res.send(error);
  }
});

module.exports = app;
