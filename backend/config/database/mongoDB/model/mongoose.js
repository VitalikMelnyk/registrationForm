// const mongoose = require("mongoose");
const { userSchema } = require("./schema");
const { databaseConnection } = require("./connection");

const User = databaseConnection.model("", userSchema, "user");

module.exports = { User, databaseConnection };
