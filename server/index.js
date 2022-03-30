const express = require("express");

const PORT = process.env.PORT || 3001;
const app = express();

// Setting up GET for local API
app.get("/api", (req, res) => {
  res.json({ message: "Hello from Express!"})
});

// Open app to run on local PORT
app.listen(PORT, () => {
  console.log("Server listening on " + PORT);
});

// Heroku deployment
if(process.env.NODE_ENV === 'production'){
    //set static folder
    app.use(express.static('client/build'));
}
app.get('*',(req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});
