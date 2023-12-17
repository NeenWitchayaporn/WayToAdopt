/* this express app provides an endpoint to check if an email is already in use.
 * it queries the Firestore database to check for existing user records with the specified email.
 * the response includes whether the email exists and a custom error code for client-side identification.
 */

const express = require("express");
const admin = require("./firebase");
const app = express();
const db = admin.firestore();

// endpoint to check if email is in use
app.post("/check-email", async (req, res) => {
  try {
    // extract the user email from the request body
    const { userEmail } = req.body;

    const userEmailNormalized = userEmail.toLowerCase();

    // check if the email already exists in the database
    const emailExists = await db
      .collection("User")
      .where("UserEmail", "==", userEmailNormalized) // compare email in database with email that user put in input
      .get();

    // respond based on whether the email exists or not
    if (!emailExists.empty) {
      return res.json({
        success: false,
        emailExists: true,
        message: "อีเมลนี้มีอยู่ในระบบแล้ว",
        // add a custom error code for client-side identification
        errorCode: "EMAIL_ALREADY_EXISTS",
      });
    } else {
      return res.json({
        success: true,
        emailExists: false,
        message: "อีเมลนี้ไม่มีอยู่ในระบบแล้ว",
        // add a custom error code for client-side identification
        errorCode: "EMAIL_NOT_EXISTS",
      });
    }
  } catch (error) {
    console.error("Error checking email:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

module.exports = app;
