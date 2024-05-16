import { Link } from 'react-router-dom';
import { Routes, Route } from "react-router-dom";
import CreateGroupPage from '../../pages/CreateGroupPage/CreateGroupPage';
import * as groupsAPI from '../../utilities/groups-api'
import {useState, useEffect} from 'react';


export default function GroupsPage() {

    const [groupList, setGroupList] = useState([]);

    useEffect(function(){
        async function getAllGroups(){
            const groups = await groupsAPI.getAll();
            setGroupList(groups);
        }
        getAllGroups();
    }, []);

    
    return (
        <div>
            <h1>Groups</h1>
            
            <ul className="list-group">
                {groupList.map(group => (
                    <Link to={`/groups/${group._id}`} key={group._id}><li className="list-group-item d-flex justify-content-between align-items-center">{group.groupName}<span class="badge text-bg-primary rounded-pill">{group.type}</span></li></Link>
                ))}
                </ul>
            
            
            <Link to='/groups/new' className="button btn-sm"> Create New Group </Link>
        </div>
    );
}
