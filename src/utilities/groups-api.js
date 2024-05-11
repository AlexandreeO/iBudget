import sendRequest from './send-request';

const BASE_URL = '/api/groups';

export function getAll (){
    return sendRequest(BASE_URL);
}

export function create(groupData){
    return sendRequest(`${BASE_URL}/new`, 'POST', groupData)

}

export function getGroup (groupId){

    return sendRequest(`${BASE_URL}/${groupId}`)

}

export function inviteMember(groupId, userEmail){
    return sendRequest(`${BASE_URL}/${groupId}/invite`, 'POST', { userEmail });
}

export function addExpense(groupId, expenseData){
    return sendRequest(`${BASE_URL}/${groupId}/newExpense`, 'POST', expenseData);
}
