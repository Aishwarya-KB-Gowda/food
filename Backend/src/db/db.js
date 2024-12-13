const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
require("dotenv").config();

let _db;

// Function to connect to MongoDB
const mongoConnect = (callback) => {
  const mongoUrl = process.env.MONGODB_URL; // Ensure MONGODB_URL exists in .env file
  if (!mongoUrl) {
    throw new Error("MONGODB_URL is not defined in .env file");
  }

  MongoClient.connect(mongoUrl, { useUnifiedTopology: true })
    .then((client) => {
      console.log("Connected to Database!");
      _db = client.db(); // Assign the database instance to _db
      callback(); // Callback to start the server after DB connection
    })
    .catch((err) => {
      console.error("Failed to connect to MongoDB:", err);
      throw err;
    });
};

// Function to get the database instance
const getDb = () => {
  if (_db) {
    return _db;
  }
  throw new Error("No database found!");
};

module.exports = { mongoConnect, getDb };
