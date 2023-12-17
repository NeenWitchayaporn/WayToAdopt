/* ihis express app handles user authentication by validating login credentials.
 * it expects a POST request with the following data
 *
 * email: the user's email for authentication
 * password: the user's password for authentication
 *
 * if successful, it generates a custom token and returns a success response.
 * if unsuccessful, it returns an appropriate error response.
 */

const express = require("express");
const admin = require("./firebase");
const db = admin.firestore();
const app = express();
const bcrypt = require("bcrypt");

// create token after checking email and password
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body; // extract email and password from the request body

    // basic validation - check if required fields are present
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: {
          code: "auth/invalid-login-credentials",
          message: "Invalid login credentials",
        },
      });
    }
    const userEmailNormalized = email.toLowerCase();

    // check if the email is already registered
    const userSnapshot = await db
      .collection("User")
      .where("UserEmail", "==", userEmailNormalized) // compare email from database with email that user put in
      .limit(1)
      .get();

    // if the email does not exist, return an error response
    if (userSnapshot.empty) {
      return res.status(200).json({
        success: false,
        emailExists: false,
        message: "Invalid login credentials",
      });
    }

    // extract user data from the firestore document
    const userDoc = userSnapshot.docs[0];
    const userData = userDoc.data();

    const passwordMatch = await bcrypt.compare(password, userData.UserPassword);
    // verify the password
    if (!passwordMatch) {
      return res.json({
        success: false,
        emailExists: true,
        passwordError: {
          message: "Invalid password",
        },
      });
    }

    // generate a custom token for the user
    const customToken = await admin.auth().createCustomToken(userDoc.id);

    // return a success response
    return res.status(200).json({
      success: true,
      message: "Authentication successful",
      user: {
        uid: userDoc.id, // extract user ID and stored in uid
        email: userData.UserEmail, // extract user email and stored in email
      },
      customToken: customToken, // store custom token for the user
    });
  } catch (error) {
    console.error("Error during login:", error.message);

    // handle other errors
    return res.status(500).json({
      success: false,
      error: {
        code: "auth/internal-error",
        message: "Internal server error during login",
      },
    });
  }
});

module.exports = app;
