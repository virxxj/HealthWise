require('dotenv').config();  // Load environment variables
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db'); // MongoDB connection with Mongoose

// Initialize Express app
const app = express();

// Middleware
app.use(cors());  // Enable Cross-Origin Resource Sharing
app.use(bodyParser.json());  // Parse incoming JSON requests

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/predict', require('./routes/predict'));  // Prediction routes for transactions

// Home route
app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
