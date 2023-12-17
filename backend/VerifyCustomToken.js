/* function to decode a custom token
 * it takes a custom token, extracts the payload, and decodes it from base64
 * returns the decoded payload as a JavaScript object
 */
const decodeCustomToken = (customToken) => {
  return JSON.parse(
    Buffer.from(customToken.split(".")[1], "base64").toString("utf-8")
  );
};
/* verify a custom token from the authorization header
 * it checks if the authorization header is present and starts with "Bearer "
 * if successful, it decodes the custom token and attaches the decoded token to the request object
 * if unsuccessful, it returns a 401 Uuauthorized response with an error message
 */

const verifyCustomToken = (req, res, next) => {
  // extract the custom token from the authorization header
  const authHeader = req.headers.authorization;

  // check if the authorization header is missing or does not start with "Bearer "
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.error("Error verifying custom token: Unauthorized access");

    // return a 401 unauthorized response with an error message
    res.status(401).json({
      success: false,
      error: {
        code: "auth/unauthorized",
        message: "Unauthorized access. Check server logs for more details.",
      },
    });
    return;
  }

  // extract the custom token from the authorization header
  const customToken = authHeader.split("Bearer ")[1];

  try {
    // decode the custom token and log the decoded token
    const decodedToken = decodeCustomToken(customToken);

    // Attach the decoded token to the request object
    req.decodedToken = decodedToken;
    next(); // continue to the next middleware or route handler
  } catch (error) {
    console.error("Error verifying custom token:", error);

    // return a more specific error response based on the verification error
    let errorMessage = "Unauthorized access";

    res.status(401).json({
      success: false,
      error: {
        code: "auth/unauthorized",
        message: errorMessage,
        details: error.message, // add more details about the error
      },
    });
  }
};

module.exports = { verifyCustomToken };
