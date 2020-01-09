const mysql = require("mysql");

const connect = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "1111",
  database: "example"
});

connect.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  const sql =
    "CREATE TABLE testings (email VARCHAR(255) NOT NULL, password VARCHAR(45) NOT NULL, id INT(11) NOT NULL AUTO_INCREMENT, PRIMARY KEY (id, email, password))";

  connect.query(sql, function(err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});

module.exports = connect;


