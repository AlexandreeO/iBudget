import React, { useState, useEffect } from 'react';
import * as expensesAPI from '../../utilities/expenses-api'; // Assuming this is the API module for fetching expenses data

export default function AllExpensesPage({ user }) {
    const [expenses, setExpenses] = useState([]);
    const [totalPaid, setTotalPaid] = useState(0);
   
    useEffect(() => {
        async function fetchExpenses() {
            try {
                // Fetch all expenses for this user
                const userExpenses = await expensesAPI.getUserExpenses();
               
                
                
                // Calculate the total amount paid
                const total = userExpenses.reduce((sum, expense) => sum + expense.amount, 0);
                
                setExpenses(userExpenses);
                setTotalPaid(total);
            } catch (error) {
                console.error('Failed to fetch expenses:', error);
                setExpenses([]);  // In case of an error, ensure state is set to prevent runtime errors
            }
        }
        fetchExpenses();
    }, [user?._id]); // Dependency array to avoid unnecessary re-fetches

    return (
        <div className="all-expenses-page">
            <h1>All Expenses I've Paid</h1>
            <ul className="expenses-list">
                {expenses.map(expense => (
                    <li key={expense._id}>
                        {expense.description} - ${expense.amount.toFixed(2)} on {new Date(expense.date).toLocaleDateString()}
                    </li>
                ))}
            </ul>
            <h2>Total Paid: ${totalPaid.toFixed(2)}</h2>
        </div>
    );
}
