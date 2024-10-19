const mongoose = require('mongoose');
require('dotenv').config(); // This will load environment variables from the .env file

const uri = process.env.MONGODB_URI; // MongoDB URI from the .env file

// Function to connect to MongoDB using Mongoose
async function connectDB() {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Successfully connected to MongoDB using Mongoose!");
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1); // Exit process with failure
  }
}

module.exports = connectDB;
