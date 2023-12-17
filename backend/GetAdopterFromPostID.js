/* this express app defines a route for retrieving details of adopters from specific pet post
 * it connects to firestore using the admin SDK to query the "Adopt" and "User" collection
 * the route expects a postID and adoptStatus parameter in the request URL, which is used to filter the adopter
 * the details of adoptions, including additional information from the "User" collection, are returned in the response
 */

const express = require("express");
const admin = require("./firebase");
const db = admin.firestore();
const app = express();

// fetch details of adoption and adopter based on postID and adoptStatus
app.get("/read/post/adopter/:postID/:adoptStatus", async (req, res) => {
  try {
    const postID = parseInt(req.params.postID); // get postID from the request parameters
    const adoptStatus = parseInt(req.params.adoptStatus); // get adoptStatus from the request parameters

    const adoptCol = db.collection("Adopt"); // access the "Adopt" collection in firestore

    // create a query to filter adoption based on PostID and adoptStatus
    const query = adoptCol
      .where("PostID", "==", postID)
      .where("AdoptStatus", "==", adoptStatus)
      .orderBy("AdopterID");

    // execute the query and get a snapshot of the result
    const querySnapshot = await query.get();
    let adoptData = [];

    // iterating through query snapshot
    for (const doc of querySnapshot.docs) {
      const adopterID = doc.data().AdopterID;
      // create a query to filter adopter based on adopterID and limit the result to 1
      const adopterQuery = db
        .collection("User")
        .where("UserID", "==", adopterID)
        .limit(1);
      const adopterQuerySnapshot = await adopterQuery.get();

      if (!adopterQuerySnapshot.empty) {
        // if adopter document is found, push each adopter data to the response data
        const adopterData = adopterQuerySnapshot.docs[0].data();
        adoptData.push({
          ...doc.data(),
          AdopterFirstName: adopterData.UserFirstName,
          AdopterLastName: adopterData.UserLastName,
        });
      } else {
        console.log("Adopter document not found");
      }
    }
    // send all adoption data with adopter's name in the response
    res.send(adoptData);
  } catch (error) {
    res.send(error);
  }
});

module.exports = app;
