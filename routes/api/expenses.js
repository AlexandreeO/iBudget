const express = require('express');
const router = express.Router();
const Expense = require('../../models/expense');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

// Get all expenses for the logged-in user
router.get('/user/:id', ensureLoggedIn, async (req, res) => {
    try {
        const userId = req.params.id;
        const expenses = await Expense.find({ 'user._id': userId });
        res.json(expenses);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch expenses' });
    }
});

// Add a new expense
router.post('/', ensureLoggedIn, async (req, res) => {
    try {
        const { description, amount, date } = req.body;
        const user = req.user; // The logged-in user

        const newExpense = new Expense({
            description,
            amount,
            date,
            user: {
                _id: user._id,
                name: user.name
            }
        });

        await newExpense.save();
        res.status(201).json(newExpense);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add expense' });
    }
});

module.exports = router;
