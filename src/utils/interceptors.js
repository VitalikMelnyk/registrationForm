import axios from "axios";
// import { Cookies } from "react-cookie";
import Cookies from "js-cookie";

axios.interceptors.response.use(undefined, err => {
  console.log("Test", err);
  console.log(err.response.status);
  if (err.response.status === 401) {
    Cookies.remove("AccessToken");
    window.location.href = "/";
  }
});

// axios.interceptors.request.use(undefined, err => {
//   console.log("Test", err);
//   const decodedToken = Cookies.get("accessToken");
//     Cookies.remove("AccessToken");
//     window.location.href = "/";
// });
