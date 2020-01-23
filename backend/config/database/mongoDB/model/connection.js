const mongoose = require("mongoose");
const { MY_HOST, MY_DATABASE } = require("../constants/constants");
const uri = `${MY_HOST}/${MY_DATABASE}`;

const databaseConnection = mongoose.createConnection(
  uri,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 3000
  },
  err => {
    if (err) {
      console.log(
        "Unable to connect to the database. Please make sure that you have mongo db installed. Also, please make sure that you changed MY_HOST  constant inside constants.js file if it necessary. Error:",
        err
      );
    } else {
      console.log("Connected to Server successfully!");
    }
  }
);

module.exports = { databaseConnection };
