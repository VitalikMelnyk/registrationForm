const mongoose = require("mongoose");
const { MY_HOST, MY_DATABASE } = require("../constants/constants");
const uri = `${MY_HOST}/${MY_DATABASE}`;
const databaseConnection = mongoose.createConnection(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

const User = databaseConnection.model("", userSchema, "user");

module.exports = { User, databaseConnection };
