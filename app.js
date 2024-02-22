const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const routes = require("./routes/routes");
const methodOverride = require("method-override");
const env = require("dotenv").config();
app.use(express.json());

// Middleware
app.set("view engine", "ejs");
app.use(methodOverride("_method")); // Use method override middleware
app.use(bodyparser.urlencoded({ extended: true }));

// Middleware to serve static files
app.use(express.static("public"));


// Connect to DB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => console.log("Some error accured!", err.codeName));

// Routes

app.use("/", routes);

// PORT listing
app.listen(process.env.PORT || 3000, () => {
  console.log("App is listing at 3000");
});
