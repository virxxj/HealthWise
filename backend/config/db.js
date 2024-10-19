const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config(); // This will load environment variables from the .env file

const uri = process.env.MONGODB_URI; // Your MongoDB URI from the .env file

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connectDB() {
  try {
    await client.connect();  // Connect to the MongoDB database
    console.log("Successfully connected to MongoDB!");
    return client;
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1); // Exit if there's an error
  }
}

module.exports = connectDB;
