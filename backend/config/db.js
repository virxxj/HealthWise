const { MongoClient } = require('mongodb');
require('dotenv').config(); // To load environment variables

const uri = process.env.MONGODB_URI;

async function connectDB() {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    
    try {
        await client.connect();
        console.log("Successfully connected to MongoDB!");
        return client;  // Return the connected client to use in other files
    } catch (err) {
        console.error("Failed to connect to MongoDB", err);
        process.exit(1);
    }
}

module.exports = connectDB;
