const mysql = require("mysql");

const db = mysql.createConnection({
  port: 3306,
  host: "localhost",
  user: "root",
  password: "",
  database: "Restaurants",
});

db.connect((err) => {
  if (err) {
    console.log("error: " + err);
  } else {
    console.log("MySql has connected successfully :)");
  }
});

module.exports = db;
