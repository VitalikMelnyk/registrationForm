const mysql = require("mysql");
const {
  MY_SQL_HOST,
  MY_SQL_PASSWORD,
  MY_SQL_USER,
  DATABASE_NAME,
  TABLE_NAME
} = require("../database/constants");
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

module.exports = { mySqlDatabaseConnection, mySqlConnection };
