const Group = require("../../models/group");
const User = require("../../models/user");
const Expense = require("../../models/expense");
module.exports = {

    getExpenses,
}



async function getExpenses (req, res){
    try {
        const expenses = await Expense.find({ user: req.user._id }).populate('user').populate('group');
        res.json(expenses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}