const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { handleError, ErrorHandler } = require("./helpers/error");
const app = express();
const { mySqlDatabaseConnection } = require("../config/database/mysql");
const { TABLE_NAME } = require("../config/database/constants");
const port = 3002;

app.use(cors());
// support parsing of application/json type post data
app.use(bodyParser.json());
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => res.send("Hello World444!"));
app.post("/users", async (req, res, next) => {
  let email = req.body.email;
  let password = req.body.password;
  let confirmPassword = req.body.confirmPassword;

  // Try_Catch handling
  try {
    // check required fields
    try {
      if (!email) {
        throw new ErrorHandler(400, "Email is required!");
      }
      if (!password) {
        throw new ErrorHandler(400, "Password is required!");
      }
      // check passwords
      if (password !== confirmPassword) {
        throw new ErrorHandler(400, "Passwords not match!");
      }
    } finally {
    }

    // check email exist
    let checkEmailFromDbQuery =
      `select email from ${TABLE_NAME} where email='${email}'`;
    const checkkEmailResult = await mySqlDatabaseConnection.query(
      checkEmailFromDbQuery
    );
    console.log(checkEmailFromDbQuery);
    console.log(checkkEmailResult);
    if (checkkEmailResult && checkkEmailResult.length) {
      throw new ErrorHandler(400, "Such email is existed!");
    }
    // if (!connect.config) {
    //   throw new ErrorHandler(500, "Not connected to database");
    // }

    // insert user to DB
    let insertQuery = `insert into ${TABLE_NAME} set ?`;
    let values = {
      email: email,
      password: password
    };
    await mySqlDatabaseConnection.query(insertQuery, values, function(
      err,
      result,
      fields
    ) {
      if (err) {
        throw new ErrorHandler(500, "Something wrong with database!");
      }
      return res.send("Saved successfully in database!");
    });
  } catch (error) {
    console.log(error);

    return handleError(error, res);
  }
});

app.get("/dashboard", (req, res) => {
  let retrievedData = `select * from ${TABLE_NAME} order by id`;
  console.log(retrievedData);
  mySqlDatabaseConnection.query(retrievedData, function(err, result, fields) {
    try {
      if (err) {
        throw new ErrorHandler(500, "Can't fetch data from database!");
      }
    } catch (error) {
      console.log(error);
      return handleError(error, res);
    }

    console.log(result);
    return res.send(result);
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

module.exports = app;
