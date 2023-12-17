/* this express app defines a route for retrieving user details based on a custom token.
 * it connects to firestore using the Firebase Admin SDK to query the "User" collection.
 * the user details, including email, first name, last name, gender, phone, and date of birth,
 * are returned in the response if the custom token is valid.
 */

const express = require("express");
const admin = require("./firebase");
const { verifyCustomToken } = require("./VerifyCustomToken");
const app = express();
const db = admin.firestore();

// verify the custom token and attach decoded token to the request
app.use("/user", verifyCustomToken);

// fetch user details
app.get("/user", verifyCustomToken, async (req, res) => {
  try {
    // check if the user information is attached to the request
    if (!req.decodedToken || !req.decodedToken.uid) {
      return res.status(400).json({
        success: false,
        error: {
          code: "auth/invalid-token",
          message: "Invalid or missing token",
        },
      });
    }

    // extract UID from the decoded token
    const uid = req.decodedToken.uid;
    console.log("UID =", uid);

    // get user information from firestore using the UID
    const userDoc = await db.collection("User").doc(uid).get();
    if (!userDoc.exists) {
      return res.status(404).json({
        success: false,
        error: {
          code: "firestore/user-not-found",
          message: "User not found in Firestore",
        },
      });
    }

    // extract user data
    const userData = userDoc.data();

    // send user information to the frontend
    res.status(200).json({
      success: true,
      user: {
        UserID: userData.UserID,
        UserEmail: userData.UserEmail,
        UserFirstName: userData.UserFirstName,
        UserLastName: userData.UserLastName,
        UserGender: userData.UserGender,
        UserPhone: userData.UserPhone,
        UserDOB: userData.UserDOB,
      },
    });
  } catch (error) {
    console.error("Error getting user information:", error);

    // handle specific error cases
    if (error.code === "auth/user-not-found") {
      return res.status(404).json({
        success: false,
        error: {
          code: "auth/user-not-found",
          message: "User not found",
        },
      });
    }

    // return a 500 error for other errors
    res.status(500).json({
      success: false,
      error: {
        code: "auth/internal-error",
        message: "Internal server error getting user information",
      },
    });
  }
});

module.exports = app;
