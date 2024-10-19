const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

// Route to handle premium prediction
router.post('/', async (req, res) => {
    const { category, amount } = req.body;

    if (!category || amount === undefined) {
        return res.status(400).json({ error: 'Invalid input' });
    }

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

    // Save the transaction in MongoDB
    const transaction = new Transaction({ category, amount, premium_adjustment: premiumAdjustment });
    await transaction.save();

    // Return the predicted premium adjustment
    res.json({ predicted_adjustment: premiumAdjustment });
});

module.exports = router;
