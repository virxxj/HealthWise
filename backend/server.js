require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('./config/db'); // MongoDB connection
const cors = require('cors');

const app = express();

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(bodyParser.json()); // Parse incoming requests

// Routes
app.use('/api/predict', require('./routes/predict')); // Transaction prediction routes

// Home route
app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
