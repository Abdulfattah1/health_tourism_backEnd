const mysql = require("mysql2");

const pool = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: `test`,
  password: "12345"
});

module.exports = pool.promise();