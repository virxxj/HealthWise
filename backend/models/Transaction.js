const mongoose = require('mongoose');

// Define schema for transactions
const TransactionSchema = new mongoose.Schema({
    category: { type: String, required: true },
    amount: { type: Number, required: true },
    premium_adjustment: { type: Number, required: true }
});

// Export the model
module.exports = mongoose.model('Transaction', TransactionSchema);
