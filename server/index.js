const express = require("express");
const AppError = require("./utils/AppError");

//////////////////
///Routes
const errorRoutes = require("./routes/errorRoutes");
const authRoutes = require('./routes/authRoutes')
const eventRoutes = require('./routes/eventRoutes')
const otherRoutes = require('./routes/otherRoutes')

const PORT = process.env.PORT || 3001;
const app = express();

//to accept form data and json data from frontend
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
})


/////////////////////////
//API ENDPOINTS


//authentication routes
app.use(authRoutes)

//event routes
app.use(eventRoutes)

//other routes
app.use(otherRoutes)

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
