const express = this.require("express");
const mysql = this.require("mysql");

const app = express();

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "設定したパスワード",
  database: "list_app"
});

connection.connect((err) => {
  if (err) {
    console.log("error connecting: " + err.stack);
    return;
  }
  console.log("success");
});

app.get("/", (req, res) => {
  connection.query("SELECT * FROM users", (error, results) => {
    console.log(results);
    res.render("hello.ejs");
  });
});

// app.listen(3000);
