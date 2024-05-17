import { useState, useEffect } from 'react';
import * as expensesAPI from '../../utilities/expenses-api'; // Assume this is the API module for fetching expenses data
import './AllExpensesPage.css'; // Import CSS for styling

export default function AllExpensesPage({ user }) {
    const [expenses, setExpenses] = useState([]);
    const [balances, setBalances] = useState({});
    const [summary, setSummary] = useState({});

    useEffect(() => {
        async function fetchExpenses() {
            const userExpenses = await expensesAPI.getUserExpenses(user._id);
            setExpenses(userExpenses);
            calculateBalances(userExpenses);
        }
        fetchExpenses();
    });

    const calculateBalances = (expenses) => {
        const balances = {};
        const summary = {
            owes: {},
            owedBy: {}
        };

        expenses.forEach(expense => {
            const { amount, user: expenseUser, participants } = expense;

            participants.forEach(participant => {
                if (participant._id === user._id) return; // Skip self

                const share = amount / (participants.length + 1); // +1 for the payer

                if (expenseUser._id === user._id) {
                    // User is the payer
                    balances[participant._id] = (balances[participant._id] || 0) - share;
                    summary.owedBy[participant._id] = (summary.owedBy[participant._id] || 0) + share;
                } else if (participant._id === user._id) {
                    // User is a participant
                    balances[expenseUser._id] = (balances[expenseUser._id] || 0) + share;
                    summary.owes[expenseUser._id] = (summary.owes[expenseUser._id] || 0) + share;
                }
            });
        });

        setBalances(balances);
        setSummary(summary);
    };

    const renderSummary = (summary, type) => {
        return Object.entries(summary[type]).map(([userId, amount]) => (
            <li key={userId}>
                {type === 'owes' ? `You owe ${userId}: $${amount.toFixed(2)}` : `${userId} owes you: $${amount.toFixed(2)}`}
            </li>
        ));
    };

    return (
        <div className="all-expenses-page">
            <h1>All Expenses</h1>
            <ul className="expenses-list">
                {expenses.map(expense => (
                    <li key={expense._id}>
                        {expense.description} - ${expense.amount} on {new Date(expense.date).toLocaleDateString()} by {expense.user.name}
                    </li>
                ))}
            </ul>
            <h2>Your Balance</h2>
            <ul className="balances-list">
                {Object.entries(balances).map(([userId, balance]) => (
                    <li key={userId}>
                        {userId}: ${balance.toFixed(2)}
                    </li>
                ))}
            </ul>
            <h2>Summary</h2>
            <h3>People you owe:</h3>
            <ul className="summary-list">
                {renderSummary(summary, 'owes')}
            </ul>
            <h3>People who owe you:</h3>
            <ul className="summary-list">
                {renderSummary(summary, 'owedBy')}
            </ul>
        </div>
    );
}
