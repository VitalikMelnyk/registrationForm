const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const { handleError, ErrorHandler } = require("./helpers/error");
const { User } = require("../config/database/mongo-cluster/cluster");
const app = express();
const port = 3002;

mongoose.set("useCreateIndex", true);

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
  let date = req.body.date;
  let city = req.body.city;
  let gender = req.body.gender;
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
      if (!city) {
        throw new ErrorHandler(400, "City is required!");
      }
      if (!gender) {
        throw new ErrorHandler(400, "Gender is required!");
      }
      if (!date) {
        throw new ErrorHandler(400, "Date of birth is required!");
      }
    } finally {
    }

    // Check email exist
    let checkEmailFromDB = await User.find({ email: email });
    console.log(checkEmailFromDB);
    if (checkEmailFromDB && checkEmailFromDB.length) {
      throw new ErrorHandler(400, "Such email is existed!");
    }

    let values = {
      email: email,
      password: password,
      city: city,
      date: date,
      gender: gender
    };
    let insertUser = await User.create(values, (err, result) => {
      if (err) {
        console.log(err);
      }
      // console.log(insertUser);
    });
    return res.send(insertUser);
  } catch (error) {
    console.log(error);

    return handleError(error, res);
  }
});

app.get("/dashboard", async (req, res) => {
  let users = await User.find({}, err => {
    if (err) return console.log(err);
  });
  console.log(users);
  return res.status(200).send(users);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

module.exports = app;
