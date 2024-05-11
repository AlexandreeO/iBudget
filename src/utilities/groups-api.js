import sendRequest from './send-request';

const BASE_URL = '/api/groups';

export function getAll (){
    return sendRequest(BASE_URL);
}

export function create(groupData){
    return sendRequest(`${BASE_URL}/new`, 'POST', groupData)

}

export function getGroup (groupId){

    return sendRequest(`${BASE_URL}/${groupId}`, groupId)

}