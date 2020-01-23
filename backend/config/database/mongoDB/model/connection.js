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
        "Unable to connect to the server. Please start the server. Error:",
        err
      );
    } else {
      console.log("Connected to Server successfully!");
    }
  }
);

module.exports = { databaseConnection };
