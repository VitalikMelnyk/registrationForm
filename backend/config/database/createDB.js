const mysql = require("mysql");
const {MY_SQL_HOST, MY_SQL_PASSWORD, MY_SQL_USER, DATABASE_NAME, TABLE_NAME} = require('./constants');
// const MY_SQL_PASSWORD = "1111";
// const MY_SQL_USER = "root";
// const DATABASE_NAME = "example";

const mySqlConnection = mysql.createConnection({
  host: MY_SQL_HOST,
  user: MY_SQL_USER,
  password: MY_SQL_PASSWORD,
  port: 3306
});

const mySqlDatabaseConnection = mysql.createConnection({
  host: MY_SQL_HOST,
  user: MY_SQL_USER,
  password: MY_SQL_PASSWORD,
  database: DATABASE_NAME
});

mySqlConnection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  mySqlConnection.query(`CREATE DATABASE ${DATABASE_NAME}`, function(
    err,
    result
  ) {
    if (err) throw err;
    console.log("Database created");

    mySqlDatabaseConnection.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
      const sql =
        "CREATE TABLE "+TABLE_NAME+" (email VARCHAR(255) NOT NULL, password VARCHAR(45) NOT NULL, id INT(11) NOT NULL AUTO_INCREMENT, PRIMARY KEY (id, email, password), UNIQUE KEY `"+TABLE_NAME+"_email` (`email`))";

      mySqlDatabaseConnection.query(sql, function(err, result) {
        if (err) throw err;
        console.log("Table created");
      });
    });
  });
});

module.exports = mySqlDatabaseConnection;