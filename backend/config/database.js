const mysql = require('mysql');
var util = require('util')

const connect = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "1111",
  database: 'users',
  port: 3306
});

connect.query = util.promisify(connect.query)

connect.connect(function(err) {
  if (err) throw err;
  console.log("Database is connected!");
});

module.exports = connect;