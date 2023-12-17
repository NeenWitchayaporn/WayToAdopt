/* this express app handles the editing of adoption status of the specific adoption
 * it updates the firestore database with new adoption status
 * it expects a POST request with the following data
 *
 * adoptID : the ID of the adoption to be edited
 */
const express = require("express");
const admin = require("./firebase");
const db = admin.firestore();
const app = express();

// edit the adoption status
app.post("/editAdoptStatus", async (req, res) => {
  try {
    const adoptID = req.body.adoptID; // get adoptID from the request body

    const adoptCol = db.collection("Adopt"); // access the "Adopt" collection in Firestore

    // create a query to filter adoption based on adoptID and limit the result to 1
    const query = adoptCol.where("AdoptID", "==", adoptID).limit(1);
    const querySnapshot = await query.get();

    if (!querySnapshot.empty) {
      // if adoption document is found, update adoption status
      const docID = querySnapshot.docs[0].id;
      await adoptCol.doc(docID).update({ AdoptStatus: 1 });
      res.status(200).json({ success: true }); // respond with success status
    }
  } catch (error) {
    res.send(error);
  }
});

module.exports = app;
