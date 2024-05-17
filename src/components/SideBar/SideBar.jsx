import { Link } from "react-router-dom";
import "./SideBar.css"; // Import the CSS file
import * as userService from '../../utilities/users-service';
import logo from '../../img/Ibudget.png';

export default function SideBar({ user, setUser }) {
    function handleLogOut() {
        userService.logOut();
        setUser(null);
    }
    return (
        <nav className="sidebar">
            <div className="sidebar-logo">
                <img src={logo} alt="Logo" />
            </div>
            <hr />
            <h5>Welcome,<br /> {user.name}</h5>
            <hr />
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/groups">View Groups</Link>
            <Link to="/expenses">My Expenses</Link>
            <Link to="" onClick={handleLogOut}>Log Out</Link>
        </nav>
    );
}
