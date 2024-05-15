import sendRequest from "./send-request";

const BASE_URL = "/api/groups";

export function getAll() {
    return sendRequest(BASE_URL);
}

export function create(groupData) {
    return sendRequest(`${BASE_URL}/new`, "POST", groupData);
}

export function deleteGroup(groupId) {
    return sendRequest(`${BASE_URL}/${groupId}`, "DELETE");
}

export function getGroup(groupId) {
    return sendRequest(`${BASE_URL}/${groupId}`);
}

export function inviteMember(groupId, userEmail) {
    return sendRequest(`${BASE_URL}/${groupId}/invite`, "POST", { userEmail });
}

export function addExpense(groupId, expenseData) {
    return sendRequest(
        `${BASE_URL}/${groupId}/newExpense`,
        "POST",
        expenseData
    );
}

export function getGroupExpenses(groupId) {
    return sendRequest(`${BASE_URL}/${groupId}/expenses`);
}

export function updateGroup(id, groupData) {
    return sendRequest(`${BASE_URL}/${id}`, "PUT", groupData);
}
