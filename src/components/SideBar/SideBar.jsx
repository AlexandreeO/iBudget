import { Link } from 'react-router-dom';



export default function SideBar() {
    return (
    <nav>
        <Link to="/dashboard"> Dashboard </Link>
        <br></br>
        <br></br>
        <Link to="/groups"> View Groups </Link>
        <br></br>
        <br></br>
        <Link to="/expenses"> My Expenses </Link>
        <br></br>
        <br></br>
        
        
    </nav>
    )

}