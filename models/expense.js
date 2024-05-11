const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const expenseSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    group: {type: Schema.Types.ObjectId, ref: 'Group'},
    description: { type: String, required: true },
    amount: { type: Number, required: true},
    date: { type: Date, default: Date.now }
});

const Expense = mongoose.model('Expense', expenseSchema);
module.exports = Expense;
