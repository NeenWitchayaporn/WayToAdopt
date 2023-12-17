/* this express app defines a route for retrieving details of all pet post
 * it connects to firestore using the admin SDK to query the "Post" and "Pet" collections
 * the details of the pet post, including additional information from the "Pet" collection, are returned in the response
 */

const express = require("express");
const admin = require("./firebase");
const db = admin.firestore();
const app = express();

// fetch details of all pet post based on postID
app.get("/read/post/all", async (req, res) => {
  try {
    // query Post collection based on PostStatus equal 0
    const petPost = db.collection("Post");
    // create a query to filter pet post based on postID and limit the result to 1
    const query = petPost.where("PostStatus", "==", 0);

    // execute the query and get a snapshot of the result
    const querySnapshot = await query.get();

    let responseArr = [];

    // loop for each document in the query result to get name type of pet
    for (const doc of querySnapshot.docs) {
      const postData = doc.data(); // store data of post
      const petID = postData.PetID; // store pet ID of post

      // query Pet collection to get name type of pet
      const queryPetTypeName = await db
        .collection("Pet")
        .where("PetID", "==", petID)
        .get();

      // if queryPetTypeName is not empty, query successfully
      if (!queryPetTypeName.empty) {
        const petData = queryPetTypeName.docs[0].data(); // store data of pet
        const petTypeName = petData.PetTypeName; // store name type of pet

        // add name type of pet in post data
        const combinedData = {
          ...postData,
          PetTypeName: petTypeName,
        };

        responseArr.push(combinedData);
      } else {
        console.error(`Pet with ID ${petID} not found.`);
      }
    }
    // send the pet post data with pet type's name in the response
    res.send(responseArr);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = app;
