const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { handleError, ErrorHandler } = require("./helpers/error");
const app = express();
// const connect = require("../config/database");
const connect = require('../config/database/connect');
const port = 3002;
let database = 'testings';
// console.log(connect);

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
      "SELECT email FROM "+database+" WHERE email='" + email + "'";
    const checkkEmailResult = await connect.query(checkEmailFromDbQuery);
    if (checkkEmailResult && checkkEmailResult.length) {
      throw new ErrorHandler(400, "Such email is existed!");
    }
    // if (!connect.config) {
    //   throw new ErrorHandler(500, "Not connected to database");
    // }

    // insert user to DB
    let insertQuery = "INSERT INTO "+database+" SET ?";
    let values = {
      email: email,
      password: password
    };
    await connect.query(insertQuery, values, function(err, result, fields) {
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
  let retrievedData = "SELECT * FROM "+database+" ORDER BY id";
  console.log(retrievedData);
  connect.query(retrievedData, function(err, result, fields) {
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
