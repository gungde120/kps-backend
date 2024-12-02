const mysql = require("mysql");
require("dotenv").config();

// Create a MySQL connection pool
const pool = mysql.createPool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

// Connect to MySQL
pool.getConnection((err, connection) => {
  if (err) {
    return console.error("Error connecting to MySQL database", err.stack);
  }
  console.log("Connected to MySQL database");
  connection.release(); // Release the connection back to the pool
});

// Export the pool for reuse in other parts of your application
module.exports = pool;
