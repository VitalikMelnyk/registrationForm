const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const connect = require("./database");
const port = 3002;

// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => res.send("Hello World444!"));

app.post("/users", async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let confirmPassword = req.body.confirmPassword;

  // check required fields
  if (!email) {
    return res.status(400).send("Email is required.");
  }
  if (!password) {
    return res.status(400).send("Passy");
  }

  // check passwords

  if (password !== confirmPassword) {
    return res.status(400).send("Passwords not match");
  }

  try {
    // check email exist
    let checkEmailFromDbQuery =
      "SELECT email FROM user WHERE email='" + email + "'";

    const checkkEmailResult = await connect.query(checkEmailFromDbQuery);

    if (checkkEmailResult && checkkEmailResult.length) {
      return res.status(400).send("Such email exists");
    }

    // insert user to DB
    let insertQuery = "INSERT INTO user SET ?";
    let values = {
      email: email,
      password: password
    };
    await connect.query(insertQuery, values);

    return res.send("Saved successfully!");
  } catch (error) {
    return res.status(500).send(error);
  }
});

app.get("/dashboard", (req, res) => {
  let retrievedData = "SELECT * FROM user ORDER BY id";
  console.log(retrievedData);
  connect.query(retrievedData, function(err, result, fields) {
    if (err) {
      throw err;
    }
    console.log(result);
    return res.send(result);
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
