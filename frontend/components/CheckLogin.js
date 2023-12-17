import Axios from "axios";

// CheckLogin component to check user login status.
const CheckLogin = async () => {
  try {
    // get the stored IdToken from local storage
    const storedIdToken = localStorage.getItem("yourIdToken");

    // if no stored IdToken is found, return null that the user is not logged in
    if (!storedIdToken) {
      return null;
    }

    // verify the user's login status by sending a request to the backend
    const response = await Axios.get("https://way-to-adopt.vercel.app/user", {
      headers: {
        Authorization: `Bearer ${storedIdToken}`,
      },
    });
    // fetch user data store in userData
    const userData = response.data.user;

    // return the IdToken and user data, that a successful login
    return { idToken: storedIdToken, userData };
  } catch (error) {
    console.error("Error checking login:", error);

    // return null, that an unsuccessful login check
    return null;
  }
};

export default CheckLogin;
