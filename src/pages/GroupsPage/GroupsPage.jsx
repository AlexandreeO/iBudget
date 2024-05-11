import { Link } from 'react-router-dom';
import { Routes, Route } from "react-router-dom";
import CreateGroupPage from '../../pages/CreateGroupPage/CreateGroupPage';

export default function GroupsPage() {
    return (
        <div>
            <h1>Groups</h1>
            <ul>
                <li></li>
            </ul>
            <Link to='/groups/new' className="button btn-sm"> Create New Group </Link>
            
        </div>
    );
}
