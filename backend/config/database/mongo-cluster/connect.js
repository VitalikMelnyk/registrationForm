const mongoose = require("mongoose");
const { CONNECTION_URL } = require("./constants");
const databaseConnection = mongoose.createConnection(
  CONNECTION_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 3000
  },
  err => {
    if (err) {
      console.log("Error occurred while connecting to MongoDB Atlas...", err);
    } else {
      console.log("Connected to Server successfully!");
    }
  }
);

module.exports = { databaseConnection };
