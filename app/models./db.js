const mysql = require("mysql");
require("dotenv").config();

const pool = mysql.createPool({
  connectionLimit: 10, // Set the maximum number of connections
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT,
});

pool.getConnection((err, connection) => {
  if (err) {
    return console.error("Error acquiring connection", err.stack);
  }
  console.log("Connected to MySQL database");

  // Release the connection back to the pool
  connection.release();
});

module.exports = pool;
