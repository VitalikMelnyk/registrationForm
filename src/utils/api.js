import axios from "axios";

const fetchData = async (method, data, headers) => {
  return new Promise((resolve, reject) => {
    axios({
      method,
      data,
      headers
    })
      .then()
      .catch();
  });
};


export const getRegisteredUsers = async (...args) => {
    return fetchData(...args);    
}

export const getPrivateData = async () => {
    return fetchData();
}
