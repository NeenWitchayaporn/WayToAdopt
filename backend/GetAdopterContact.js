/* this express app defines a route for retrieving adopter details based on  adopterID.
 * it connects to firestore using the Firebase Admin SDK to query the "User" collection.
 * the user details, including email, first name, last name, and phone,
 * are returned in the response if the custom token is valid.
 */

const express = require("express");
const admin = require("./firebase");
const db = admin.firestore();
const app = express();

// fetching adopter information by adopterID
app.get("/adopter/:adopterID", async (req, res) => {
  try {
    // adopterID from the request parameters
    const adopterID = parseInt(req.params.adopterID);
    const user = db.collection("User");

    // create a query to filter user based on UserID and limit the result to 1
    const query = user.where("UserID", "==", adopterID).limit(1);

    // execute the query and get a snapshot of the result
    const querySnapshot = await query.get();

    if (!querySnapshot.empty) {
      // if post document is found, add post status to the adoption data
      const adopterData = querySnapshot.docs[0].data();
      res.send(adopterData);
    } else {
      console.log("User document not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

module.exports = app;
