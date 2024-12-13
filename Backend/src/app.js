const express = require("express");
const dotenv = require("dotenv");
const { mongoConnect } = require("./db/db"); // Import the `mongoConnect` function
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/images/"));

// Set up CORS headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, AuthToken"
  );
  next();
});

// Example routes (replace with your actual routes)
app.get("/", (req, res) => {
  res.send("Welcome to Map-My-Food API!");
});

// Connect to the database and start the server
mongoConnect(() => {
  app.listen(8080, () => {
    console.log("Server is listening on Port 8080");
  });
});
