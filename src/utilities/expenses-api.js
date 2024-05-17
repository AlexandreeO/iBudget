import sendRequest from './send-request';

const BASE_URL = '/api/expenses';

// Fetch all expenses for a specific user
export function getUserExpenses(userId) {
    return sendRequest(`${BASE_URL}/user/${userId}`);
}

// Fetch a specific expense by its ID
export function getExpense(expenseId) {
    return sendRequest(`${BASE_URL}/${expenseId}`);
}

// Add a new expense
export function addExpense(expenseData) {
    return sendRequest(BASE_URL, 'POST', expenseData);
}

// Update an existing expense
export function updateExpense(expenseId, expenseData) {
    return sendRequest(`${BASE_URL}/${expenseId}`, 'PUT', expenseData);
}

// Delete an expense
export function deleteExpense(expenseId) {
    return sendRequest(`${BASE_URL}/${expenseId}`, 'DELETE');
}
