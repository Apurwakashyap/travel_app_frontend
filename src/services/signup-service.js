import axios from "axios";

export const signupHandler = async (username, number, email, password, setAlert) => {
  try {
    const data = await axios.post(
      "https://travel-app-backened.onrender.com/api/auth/register",
      {
        username: username,
        number: number,
        email: email,
        password: password,
      }
    );
    //console.log("Signed Up");
    //console.log(data);
    console.log("Response from backend:", data);
    setAlert({
      open: true,
      message: `Account Created:: username - ${username}`,
      type: "success"
    })
  } catch (err) {
    console.log("error adding user to database");
  }
};