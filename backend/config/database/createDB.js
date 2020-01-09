const  mysql = require('mysql');

const con = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "1111",
  port: 3306
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("CREATE DATABASE example", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });
});