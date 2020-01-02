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

app.post("/users", (req, res) => {
    // console.log(11111, req)

    console.log("Got body:", req.body);
    console.log(req.body.email);
    let email = req.body.email;
    let password = req.body.password;
    // let sql = 'INSERT INTO user (email, password) VALUES (' + email + ', ' + password + ')';
      let sql = 'INSERT INTO user SET ?';
    let values = {
        email: email,
        password: password
    }
    console.log(values);

    connect.query(sql, values, function (err, res) {
        if (err) {
            throw err;
        }
        console.log(res);
        console.log('Record is inserted, ID: ', res.insertId)
    })

    return res.send('Saved successfully!');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
