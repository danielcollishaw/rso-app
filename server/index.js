const express = require("express");
const mysql = require('mysql');
const AppError = require("./utils/AppError");

//////////////////
///Routes
const errorRoutes = require("./routes/errorRoutes");
const authRoutes = require('./routes/authRoutes')

const PORT = process.env.PORT || 3001;
const app = express();

//to accept form data and json data from frontend
app.use(express.urlencoded({ extended: true }))
app.use(express.json())



// This is the how to connect the dbms
let connection = mysql.createConnection({
  host: "kutnpvrhom7lki7u.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
  user: "f5gigm2mf017jybo",
  password: "zhrz58cvoiymdzai",
  database: "rizjyg7r4b89vtwx"
});
connection.connect();

module.exports = connection

/* This is how to query, it will return a list of rows so you can access using
index, each row is a json object. */
// connection.query("SELECT * FROM universities", (err, res) => {
//   if (err) throw new AppError(err, 502);
//   console.log(res);
// });


/////////////////////////
//API ENDPOINTS
app.get("/api", (_, res) => {
  res.json({ message: "Hello from Express!" })
});

//authentication routes
app.use(authRoutes)

//error handling routes
app.use(errorRoutes)


app.listen(PORT, () => {
  console.log("Server listening on " + PORT);
});

// Defines Heroku deployment
if (process.env.NODE_ENV === 'production') {
  //set static folder
  app.use(express.static('client/build'));
}

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});
