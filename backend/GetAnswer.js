/* this express app defines a route for retrieving answers from a specific adoption
 * it connects to firestore using the admin SDK to query the "AdopterAnswer" and "PostQuestion" collections
 * the route expects a adoptID parameter in the request url, which is used to filter the adoption
 * the answers , including additional information from the "PostQuestion" collection, are returned in the response
 */

const express = require("express");
const admin = require("./firebase");
const db = admin.firestore();
const app = express();

// fetch answers from a specific adoption based on adoptID
app.get("/read/answer/:adoptID", async (req, res) => {
  try {
    const adoptID = parseInt(req.params.adoptID); // get adoptID from the request parameters

    const adoptAnswerCol = db.collection("AdopterAnswer"); // access the "AdopterAnswer" collection in Firestore

    // query to filter all answers based on adoptID
    const answerQuery = adoptAnswerCol.where("AdoptID", "==", adoptID);
    // execute the query and get a snapshot of the result
    const answerResultQuery = await answerQuery.get();
    let adoptAnswerData = [];

    // iterating through query snapshot
    for (const doc of answerResultQuery.docs) {
      const postQID = doc.data().PostQID;
      // create a query to filter question based on postQID
      const questionQuery = db
        .collection("PostQuestion")
        .where("PostQID", "==", postQID);
      const questionQuerySnapshot = await questionQuery.get();

      if (!questionQuerySnapshot.empty) {
        // if postQuestion document is found, push each question data to the response data
        const questionData = questionQuerySnapshot.docs[0].data();
        adoptAnswerData.push({
          ...doc.data(),
          QuestionTitle: questionData.QuestionTitle,
        });
      } else {
        console.log("PostQuestion document not found");
      }
    }
    // send all adopter's answer data with question title in the response
    res.send(adoptAnswerData);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = app;
