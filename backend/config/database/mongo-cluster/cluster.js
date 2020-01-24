const { userSchema } = require("../mongoDB/model/schema");
const { databaseConnection } = require("./connect");

const User = databaseConnection.model("", userSchema, "user");

module.exports = { User, databaseConnection };
