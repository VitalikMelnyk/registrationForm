const mysql = require("mysql");
const {
  MY_SQL_HOST,
  MY_SQL_PASSWORD,
  MY_SQL_USER,
  DATABASE_NAME,
  TABLE_NAME
} = require("./constants");
// const MY_SQL_PASSWORD = "1111";
// const MY_SQL_USER = "root";
// const DATABASE_NAME = "example";

const mySqlConnection = mysql.createConnection({
  host: MY_SQL_HOST,
  user: MY_SQL_USER,
  password: MY_SQL_PASSWORD,
  port: 3306, 
  multipleStatements: true

});

const mySqlDatabaseConnection = mysql.createConnection({
  host: MY_SQL_HOST,
  user: MY_SQL_USER,
  password: MY_SQL_PASSWORD,
  database: DATABASE_NAME,
  multipleStatements: true
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
      // const sql =
      //   `CREATE TABLE ${TABLE_NAME} email VARCHAR(255), password VARCHAR(45), id INT(11)`;

      let sql = `CREATE TABLE  member (
        id INT NOT NULL ,
  email VARCHAR(45) NOT NULL,
  password VARCHAR(45) NOT NULL,
    )`;

      mySqlDatabaseConnection.query(sql, function(err, result) {
        if (err) throw err;
        console.log("Table created");
      });
    });
  });
});

module.exports = mySqlDatabaseConnection;
