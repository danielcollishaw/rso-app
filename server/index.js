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
