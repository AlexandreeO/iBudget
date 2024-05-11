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
            <div>
                {groupList.map(group => (
                    <Link to={`/groups/${group._id}`} key={group._id}>{group.groupName}<br></br></Link>
                ))}
            </div>
            <Link to='/groups/new' className="button btn-sm"> Create New Group </Link>
        </div>
    );
}
