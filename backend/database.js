const mysql = require('mysql');

const connect = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "1111",
  database: 'users',
  port: 3306
});

connect.connect(function(err) {
  if (err) throw err;
  console.log("Database is connected!");
});

module.exports = connect;