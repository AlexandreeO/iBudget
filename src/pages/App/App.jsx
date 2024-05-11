import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { getUser } from "../../utilities/users-service";
import "./App.css";
import AuthPage from "../AuthPage/AuthPage";
import SideBar from "../../components/SideBar/SideBar";
import NavBar from "../../components/NavBar/NavBar";
import GroupsPage from "../../pages/GroupsPage/GroupsPage";
import DashboardPage from '../../pages/DashboardPage/DashboardPage';
import AllExpensesPage from '../../pages/AllExpensesPage/AllExpensesPage';
import CreateGroupPage from '../../pages/CreateGroupPage/CreateGroupPage';
import GroupDetailPage from '../../pages/GroupDetailPage/GroupDetailPage';

export default function App() {
    const [user, setUser] = useState(getUser());
    const [groupList, setGroupList] = useState([]);

    return (
        <main className="App">
            {user ? (
                <>
                    <NavBar user={user} setUser={setUser} />
                    <SideBar />
                    <Routes>
                        <Route path="/dashboard" element={<DashboardPage />} />
                        <Route path="/groups" element={<GroupsPage groupList={groupList} setGroupList={setGroupList}/>} />
                        <Route path='/groups/new' element={<CreateGroupPage groupList={groupList} setGroupList={setGroupList}/>} />
                        <Route path="/groups/:id" element={<GroupDetailPage />} />
                        <Route path="/expenses" element={<AllExpensesPage />} />
                        
                    </Routes>
                </>
            ) : (
                <AuthPage setUser={setUser} />
            )}
        </main>
    );
}
