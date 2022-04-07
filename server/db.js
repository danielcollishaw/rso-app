const mysql = require('mysql');

// This is the how to connect the dbms
let connection = mysql.createConnection({
    host: "kutnpvrhom7lki7u.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    user: "f5gigm2mf017jybo",
    password: "zhrz58cvoiymdzai",
    database: "rizjyg7r4b89vtwx"
});
connection.connect(function (err) {
    if (err) throw Error('unsuccessful connection for some reason')
});

module.exports = connection

/* This is how to query, it will return a list of rows so you can access using
index, each row is a json object. */
// connection.query("SELECT * FROM universities", (err, res) => {
//   if (err) throw new AppError(err, 502);
//   console.log(res);
// });
