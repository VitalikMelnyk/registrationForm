import axios from "axios";
import Cookies from "js-cookie";
import { SERVER_URL } from "../shared/serverUrl";
// // Add a request interceptor
axios.interceptors.request.use(
  config => {
    // Do something before request is sent
    console.log("Request");
    console.log(config);
    return config;
  },
  error => {
    // Do something with request error
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  response => {
    console.log("Response");
    console.log(response);
    const refreshToken = Cookies.get("RefreshToken");
    const accessToken = Cookies.get("AccessToken");
    // console.log(refreshToken);
    // console.log(accessToken);
    // if (!accessToken) {
    // if (refreshToken && !accessToken) {
    if (!accessToken && refreshToken) {
      axios
        .post(`${SERVER_URL}/refreshToken`, { refreshToken: refreshToken })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
    return response;
  },
  // },
  err => {
    return Promise.reject(err);
  }
);
