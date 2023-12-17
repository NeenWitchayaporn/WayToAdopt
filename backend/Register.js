/* this express app handles user registration by creating a new user in firebase authentication
 * and storing additional user information in firestore.
 * it expects a POST request with user registration data in the request body.
 */

const express = require("express");
const admin = require("./firebase");
const db = admin.firestore();
const app = express();
const bcrypt = require("bcrypt");
const saltRounds = 10;

// firebase authentication reference
const auth = admin.auth();

// endpoint for user registration
app.post("/register", async (req, res) => {
  try {
    // structure user registration data from request body
    const {
      userFirstName,
      userLastName,
      userDOB,
      userGender,
      userPhone,
      userEmail,
      userPassword,
    } = req.body;

    const userEmailNormalized = userEmail.toLowerCase(); // normalize the user's password using bcrypt
    const hashedPassword = await bcrypt.hash(userPassword, saltRounds); // hash the user's password using bcrypt

    // create a new user in firebase authentication
    const userCredential = await auth.createUser({
      email: userEmailNormalized,
      password: hashedPassword,
    });

    // get the UID (user ID) of the newly created user
    const newUserID = userCredential.uid;

    // find the highest userID in database
    const userSnapshot = await db
      .collection("User")
      .orderBy("UserID", "desc")
      .limit(1)
      .get();
    let highestUserID = 0;

    // check if there are existing users in the database
    if (!userSnapshot.empty) {
      const highestUser = userSnapshot.docs[0].data();
      highestUserID = highestUser.UserID;
    }

    // assign new user a userID one greater than the highest one
    const assignedUserID = highestUserID + 1;

    // store additional user information in firestore including new userID
    await db.collection("User").doc(newUserID).set({
      UserFirstName: userFirstName,
      UserLastName: userLastName,
      UserDOB: userDOB,
      UserGender: userGender,
      UserPhone: userPhone,
      UserEmail: userEmailNormalized,
      UserPassword: hashedPassword,
      UserID: assignedUserID,
    });

    // return success response
    return res.status(200).json({
      success: true,
      message: "User registered successfully",
      userID: assignedUserID,
    });
  } catch (error) {
    console.error("Error during user registration:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

module.exports = app;
