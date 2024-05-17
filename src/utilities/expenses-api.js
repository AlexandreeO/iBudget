import sendRequest from './send-request';

const BASE_URL = '/api/expenses';

// Fetch all expenses for a specific user
export function getUserExpenses() {
    return sendRequest(`${BASE_URL}`);
}
