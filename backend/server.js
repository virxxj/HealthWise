require('dotenv').config();  // Load environment variables
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');  // MongoDB connection using native driver

// Initialize Express app
const app = express();

// Middleware
app.use(cors());  // Enable Cross-Origin Resource Sharing
app.use(bodyParser.json());  // Parse incoming JSON requests

// Connect to MongoDB and set up routes
connectDB().then(client => {
    const db = client.db('yourDatabaseName');  // Specify the database name here
    const transactionsCollection = db.collection('transactions');

    // Example route for inserting a transaction
    app.post('/api/predict', async (req, res) => {
        const { category, amount } = req.body;

        // Define category adjustments (this can be replaced by ML logic later)
        const categoryAdjustments = {
            'gym': -5,
            'healthy_groceries': -10,
            'fast_food': 8,
            'alcohol': 12,
            'supplements': -7,
            'organic_food': -8,
            'sports_equipment': -6
        };

        const premiumAdjustment = categoryAdjustments[category] || 0;

        try {
            // Insert into the transactions collection
            const transaction = { category, amount, premium_adjustment: premiumAdjustment };
            await transactionsCollection.insertOne(transaction);
            res.json({ predicted_adjustment: premiumAdjustment });
        } catch (error) {
            res.status(500).json({ error: 'Failed to save transaction' });
        }
    });

    // Home route
    app.get('/', (req, res) => {
        res.send('Hello from the backend!');
    });

    // Start the server
    const PORT = process.env.PORT || 5001;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
