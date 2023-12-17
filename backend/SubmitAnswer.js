/* this express app handles the submission of answers for the adoption questionnaire
 * it updates the firestore database with information about the adoption and the adopter's answers
 * it expects a POST request with the following data
 *
 * postID : the ID of the pet post associated with the adoption
 * adopterID : the ID of the adopter
 * answers :  adopter's answers to each question in the questionnaire
 */

const express = require("express");
const admin = require("./firebase");
const db = admin.firestore();
const app = express();

// submit answers of adoption questionnaire
app.post("/submitAnswers", async (req, res) => {
  try {
    const { postID, adopterID, answers } = req.body;

    // find the latest AdoptID from the Adopt collection
    const latestAdoptID = await db
      .collection("Adopt")
      .orderBy("AdoptID", "desc")
      .limit(1)
      .get()
      .then((querySnapshot) => {
        if (!querySnapshot.empty) {
          return querySnapshot.docs[0].data().AdoptID;
        } else {
          return 0; // return 0 if there is no data in the collection
        }
      })
      .catch((error) => {
        console.error("Error getting latest AdoptID: ", error);
        return 0;
      });

    // assign a new AdoptID
    const newAdoptID = latestAdoptID + 1;

    // save data to the Adopt collection
    db.collection("Adopt").add({
      AdoptID: newAdoptID,
      PostID: parseInt(postID),
      AdopterID: parseInt(adopterID),
      AdoptStatus: 0,
    });

    // find the latest AdopterAnswerID from the AdopterAnswer collection
    const latestAdopterAnswerID = await db
      .collection("AdopterAnswer")
      .orderBy("AdopterAnswerID", "desc")
      .limit(1)
      .get()
      .then((querySnapshot) => {
        if (!querySnapshot.empty) {
          return querySnapshot.docs[0].data().AdopterAnswerID;
        } else {
          return 0; // return 0 if there is no data in the collection
        }
      })
      .catch((error) => {
        console.error("Error getting latest AdopterAnswerID: ", error);
        return 0;
      });

    // assign a new AdopterAnswerID
    const newAdopterAnswerID = latestAdopterAnswerID + 1;
    const adopterAnswerArray = Object.entries(answers).map(
      ([PostQID, QuestionAnswer]) => ({
        PostQID: parseInt(PostQID),
        QuestionAnswer,
      })
    );
    // save data to the AdopterAnswer collection iteratively
    adopterAnswerArray.forEach(({ PostQID, QuestionAnswer }, index) => {
      db.collection("AdopterAnswer").add({
        AdopterAnswerID: newAdopterAnswerID + index,
        AdoptID: newAdoptID,
        PostQID,
        QuestionAnswer,
      });
    });

    res.status(200).json({ success: true }); // respond with success status
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ success: false, error: "Error submiting answer" });
  }
});

module.exports = app;
