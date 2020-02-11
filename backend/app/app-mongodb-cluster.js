const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const jwtKey = "my_secret_key";
const cors = require("cors");
const { handleError, ErrorHandler } = require("./helpers/error");
const { User } = require("../config/database/mongo-cluster/cluster");
const app = express();
const port = 3002;

mongoose.set("useCreateIndex", true);

app.use(cors());
// support parsing of application/json type post data
app.use(bodyParser.json());
app.use(cookieParser());
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => res.send("Hello World444!"));
app.post("/users", async (req, res, next) => {
  const { email, password, confirmPassword, date, city, gender } = req.body;
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

    // await doesen't wait for bcrypt.hash because bcrypt.hash does not
    //  return a promise. Use the following method, which wraps bcrypt
    //  in a promise in order to use await.
    const hashedPassword = await new Promise((resolve, reject) => {
      bcrypt.hash(password, saltRounds, function(err, hash) {
        if (err) reject(err);
        resolve(hash);
      });
    });

    let values = {
      email: email,
      password: hashedPassword,
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
app.post("/auth", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    // Check email exist
    const userFromDB = await User.find({ email: email });
    if (userFromDB.length === 0) {
      throw new ErrorHandler(400, "Such email doesn't exist");
    }
    const { email: emailFromDB, password: passwordFromDB } = userFromDB[0];
    console.log("Email: ", emailFromDB);
    console.log("Password", passwordFromDB);

    const verifyPassword = await new Promise((resolve, reject) => {
      bcrypt.compare(password, passwordFromDB, (err, success) => {
        if (err) {
          console.log(err);
        }
        resolve(success);
      });
    });
    console.log(verifyPassword);
    // Generate token to client
    if (emailFromDB && verifyPassword) {
      const token = jwt.sign({ emailFromDB }, jwtKey, {
        algorithm: "HS256",
        expiresIn: "1h"
      });
      console.log("Token:", token);
      // return res
      //   .cookie("token", token, {
      //     httpOnly: true,
      //     secure: true,
      //     sameSite: true
      //   })
      //   .sendStatus(200);
      return res.send(token);
    }
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

app.get(
  "/checkToken",
  (req, res, next) => {
    const token =
      req.body.token ||
      req.query.token ||
      req.headers["x-access-token"] ||
      req.cookies.token;

    if (!token) {
      res.status(401).send("Unauthorized: No token provided");
    } else {
      jwt.verify(token, jwtKey, function(err, decoded) {
        if (err) {
          res.status(401).send("Unauthorized: Invalid token");
        } else {
          req.email = decoded.email;
          next();
        }
      });
    }
  },
  (req, res) => {
    return res.sendStatus(200);
  }
);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

module.exports = app;
