/* this express app defines a route for retrieving specific filtered pet post
 * it connects to firestore using the admin SDK to query the "Post" and "Pet" collections
 * the route expects a query parameter in the request url, which is used to filter the pet post
 * the details of the pet post, including additional information from the "Pet" collection, are returned in the response
 */

const express = require("express");
const admin = require("./firebase");
const db = admin.firestore();
const app = express();

// fetch details of a specific pet post based on query parameter from searching
app.get("/search?:queryParams", async (req, res) => {
  try {
    // function to change string "" to null
    const ChangeStringtoNull = (str) => {
      return str === "" ? null : str;
    };

    // extract query parameters
    let petType = ChangeStringtoNull(req.query.PetType);
    if (petType !== null) {
      petType = parseInt(petType);
    }

    const petVaccinated = ChangeStringtoNull(req.query.PetVaccinated);
    const petSterilized = ChangeStringtoNull(req.query.PetSterilized);
    const petWean = ChangeStringtoNull(req.query.PetWean);
    const petHousebreaking = ChangeStringtoNull(req.query.PetHousebreaking);

    // set up initial query for query Post collection based on PostStatus equal 0
    let petpost = db.collection("Post");
    let querysearch = petpost.where("PostStatus", "==", 0);

    // apply additional filters based on query parameters
    if (
      !petType &&
      !petVaccinated &&
      !petSterilized &&
      !petWean &&
      !petHousebreaking
    ) {
      // no additional filters if no query parameters
      querysearch = querysearch;
    }
    // apply filters based on provided query parameters
    else if (
      petType !== null ||
      petVaccinated !== null ||
      petSterilized !== null ||
      petWean !== null ||
      petHousebreaking !== null
    ) {
      if (petVaccinated !== null) {
        querysearch = querysearch.where("PetVaccinated", "==", petVaccinated);
      }

      if (petSterilized !== null) {
        querysearch = querysearch.where("PetSterilized", "==", petSterilized);
      }
      if (petWean !== null) {
        querysearch = querysearch.where("PetWean", "==", petWean);
      }
      if (petHousebreaking !== null) {
        querysearch = querysearch.where(
          "PetHousebreaking",
          "==",
          petHousebreaking
        );
      }
      if (petType !== null) {
        querysearch = querysearch.where("PetID", "==", petType);
      }
    }

    // query and get the results
    const response = await querysearch.get();
    const responseArr = [];

    // loop for each document in the query result to get name type of pet
    for (const doc of response.docs) {
      const postquery = doc.data(); // store data of post
      const petID = postquery.PetID; // store pet ID of post

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
        const postData = {
          ...postquery,
          PetTypeName: petTypeName,
        };

        responseArr.push(postData);
      }
    }
    // send the pet post data with pet type's name in the response
    res.send(responseArr);
  } catch (error) {
    res.send(error);
  }
});

module.exports = app;
