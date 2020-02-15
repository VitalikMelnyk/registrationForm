const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const { handleError, ErrorHandler } = require("./helpers/error");
const {
  accessTokenSecret,
  refreshTokenSecret,
  saltRounds,
  port
} = require("./helpers/config");
const { User } = require("../config/database/mongoDB/model/mongoose");
const { redisClient } = require("../config/database/redis/connect");
const app = express();

mongoose.set("useCreateIndex", true);
app.use(cors());
// support parsing of application/json type post data
app.use(bodyParser.json());
app.use(cookieParser());
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/register", async (req, res, next) => {
  console.log(req.body);
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
    let checkEmailFromDB = await User.findOne({ email });
    console.log(checkEmailFromDB);
    if (checkEmailFromDB) {
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

    const values = {
      email: email,
      password: hashedPassword,
      date: date,
      city: city,
      gender: gender
    };
    // -------------GENERATE TOKEN IN REGISTRATION---------------
    // const createUserAndGenerateToken = await new Promise((resolve, reject) => {
    //   User.insertMany(values, async (err, result) => {
    //     if (err) {
    //       console.log(err);
    //     }
    //     const getUser = await User.findOne({ email });
    //     const {
    //       email: emailFromDB,
    //       password: passwordFromDB,
    //       id: userId
    //     } = getUser;
    //     // console.log(emailFromDB);
    //     // console.log(passwordFromDB);
    //     const verifyPassword = await new Promise((resolve, reject) => {
    //       bcrypt.compare(password, passwordFromDB, (err, success) => {
    //         if (err) {
    //           console.log(err);
    //         }
    //         resolve(success);
    //       });
    //     });
    //     // Generate token to client
    //     if (emailFromDB && verifyPassword) {
    //       const token = jwt.sign({ userId }, accessTokenSecret, {
    //         algorithm: "HS256",
    //         expiresIn: "1h"
    //       });
    //       console.log("Token:", token);
    //       const redisToken = {
    //         userId,
    //         token
    //       };
    //       console.log(redisToken);
    //       resolve(redisToken);
    //     }
    //   });
    // });
    // console.log(createUserAndGenerateToken);
    // const { userId, token } = createUserAndGenerateToken;
    // set to redis
    // redisClient.set(userId, token);
    // console.log(redisClient.get(userId));
    // return res.send(createUserAndGenerateToken);

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

app.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    // Check email exist
    const userFromDB = await User.findOne({ email: email });
    console.log(userFromDB);
    if (!userFromDB) {
      throw new ErrorHandler(400, "Such email doesn't exist");
    }
    const {
      email: emailFromDB,
      password: passwordFromDB,
      id: userId
    } = userFromDB;
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
    if (!verifyPassword) {
      throw new ErrorHandler(400, "Password isn't correct!");
    }
    // Generate token to client
    if (emailFromDB && verifyPassword) {
      const accessToken = jwt.sign({ userId }, accessTokenSecret, {
        algorithm: "HS256",
        expiresIn: "10s"
      });
      const refreshToken = jwt.sign({ userId }, refreshTokenSecret, {
        algorithm: "HS256",
        expiresIn: "1h"
      });
      console.log("AccessToken:", accessToken);
      console.log("Refresh  Token:", refreshToken);
      const expiredAt = jwt.decode(accessToken);
      const expiredDate = expiredAt.exp;
      redisClient.set(userId, accessToken);
      return res.send({ accessToken, refreshToken, expiredDate });
    }
  } catch (error) {
    console.log(error);
    return handleError(error, res);
  }
});
const verifySync = async (token, accessTokenSecret) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, accessTokenSecret, (err, decoded) => {
      console.log(err, decoded);
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
};

const isAuth = async (req, res, next) => {
  const tokenFromBrowser = req.headers["x-auth"];
  if (!tokenFromBrowser) {
    res.status(401).send("Unauthorized: No token provided");
  } else {
    let decodedData;
    try {
      decodedData = await verifySync(tokenFromBrowser, accessTokenSecret);
    } catch (err) {
      // ,
      res.status(401).send("User isn't authorized");
    }
    const user = await User.findOne({ _id: decodedData.userId });
    if (!user) {
      res.status(401).send("User didn't find ");
    }

    const tokenFromRedis = await new Promise((resolve, reject) => {
      redisClient.get(user.id, (err, result) => {
        if (err) {
          reject(err);
          throw err;
        }
        resolve(result);
      });
    });

    if (tokenFromBrowser === tokenFromRedis) {
      next();
    } else {
      res.status(401).send("Tokens aren't match ");
    }
  }
};
// app.post("/checkToken", isAuth, (req, res) => {
//   return res.status(200);
// });
app.post("/refreshToken", (req, res) => {
  const { refreshToken } = req.cookies;
});

app.get("/dashboard", isAuth, async (req, res) => {
  let users = await User.find({}, err => {
    if (err) return console.log(err);
  });
  return res.status(200).send(users);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

module.exports = app;
