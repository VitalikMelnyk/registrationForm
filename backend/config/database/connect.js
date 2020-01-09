const mysql = require("mysql");
const util = require("util");

const connect = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "1111",
  database: "example"
});

connect.query = util.promisify(connect.query);

connect.connect(function(err) {
    try {
      if (err) {
        throw err;
      }
      // throw err;
      console.log("Database is connected!");
    } catch (error) {
      console.log(error);
    }
  });
  
  module.exports = connect;
  