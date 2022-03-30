const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();

/*
This is the how to connect the dbms

const mysql = require('mysql');
var connection = mysql.createConnection({
  host: "kutnpvrhom7lki7u.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
  user: "f5gigm2mf017jybo",
  password: "zhrz58cvoiymdzai",
  database: "rizjyg7r4b89vtwx"
});

connection.connect();

This is how to query, it will return a list of rows so you can access using
index, each row is a json object.

connection.query("SELECT * FROM test", (err, res) => {
  if (err) throw err;

  console.log(res);
});
*/

// API Calls
app.get("/api", (req, res) => {
  res.json({ message: "Hello from Express!"})
});

app.listen(PORT, () => {
  console.log("Server listening on " + PORT);
});

// Defines Heroku deployment
if (process.env.NODE_ENV === 'production'){
    //set static folder
    app.use(express.static('client/build'));
}
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});
