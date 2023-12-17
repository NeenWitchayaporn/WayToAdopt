/* this express app defines a route for retrieving details of a specific pet post
 * it connects to firestore using the admin SDK to query the "Post" and "Pet" collections
 * the route expects a postID parameter in the request url, which is used to filter the pet post
 * the details of the pet post, including additional information from the "Pet" collection, are returned in the response
 */

const express = require("express");
const admin = require("./firebase");
const db = admin.firestore();
const app = express();

// fetch details of a specific pet post based on postID
app.get("/read/:postID", async (req, res) => {
  try {
    const postID = parseInt(req.params.postID); // get postID from the request parameters

    const postCol = db.collection("Post"); // access the "Post" collection in firestore

    // create a query to filter pet post based on postID and limit the result to 1
    const query = postCol.where("PostID", "==", postID).limit(1);

    // execute the query and get a snapshot of the result
    const querySnapshot = await query.get();
    const postData = querySnapshot.docs[0].data();

    const petID = postData.PetID;
    // accessing the "Pet" collection in firestore and create a query to filter based on petID
    const petQuery = db.collection("Pet").where("PetID", "==", petID).limit(1);
    const petQuerySnapshot = await petQuery.get();

    if (!petQuerySnapshot.empty) {
      // if pet document is found, add pet type's name to the pet post data
      const petData = petQuerySnapshot.docs[0].data();
      postData.PetTypeName = petData.PetTypeName;
    } else {
      console.log("Pet document not found");
    }
    // send the pet post data with pet type's name in the response
    res.send(postData);
  } catch (error) {
    res.send(error);
  }
});

module.exports = app;
