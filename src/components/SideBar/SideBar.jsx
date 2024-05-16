import { Link } from "react-router-dom";
import "./SideBar.css"; // Import the CSS file
import * as userService from '../../utilities/users-service';

export default function SideBar({ user, setUser }) {
    function handleLogOut() {
        userService.logOut();
        setUser(null);
    }
    return (
        <nav className="sidebar">
            <h5>Welcome, {user.name}</h5>
            <hr />
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/groups">View Groups</Link>
            <Link to="/expenses">My Expenses</Link>
            <Link to="" onClick={handleLogOut}>Log Out</Link>
        </nav>
    );
}
