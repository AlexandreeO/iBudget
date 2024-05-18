import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { getUser } from "../../utilities/users-service";
import "./App.css";
import AuthPage from "../AuthPage/AuthPage";
import SideBar from "../../components/SideBar/SideBar";
import GroupsPage from "../../pages/GroupsPage/GroupsPage";
import HomePage from "../../pages/HomePage/HomePage";
import DashboardPage from "../../pages/DashboardPage/DashboardPage";
import AllExpensesPage from "../../pages/AllExpensesPage/AllExpensesPage";
import CreateGroupPage from "../../pages/CreateGroupPage/CreateGroupPage";
import GroupDetailPage from "../../pages/GroupDetailPage/GroupDetailPage";
import GroupEditForm from "../../components/GroupEditForm/GroupEditForm";

export default function App() {
    const [user, setUser] = useState(getUser());
    const [groupList, setGroupList] = useState([]);

    return (
        <main className="App">
            {user ? (
                <>
                    <div>
                        <SideBar user={user} setUser={setUser}/>
                    </div>

                    <div className="main-content">
                        <Routes>
                            <Route
                                path="/"
                                element={<HomePage/>}
                            />
                            <Route
                                path="/dashboard"
                                element={<DashboardPage />}
                            />
                            <Route
                                path="/groups"
                                element={
                                    <GroupsPage
                                        groupList={groupList}
                                        setGroupList={setGroupList}
                                    />
                                }
                            />
                            <Route
                                path="/groups/new"
                                element={
                                    <CreateGroupPage
                                        groupList={groupList}
                                        setGroupList={setGroupList}
                                    />
                                }
                            />
                            <Route
                                path="/groups/:id"
                                element={<GroupDetailPage currentUser={user} />}
                            />
                            <Route
                                path="/expenses"
                                user={user}
                                element={<AllExpensesPage />}
                            />
                            <Route
                                path="/groups/:id/edit"
                                element={<GroupEditForm currentUser={user} />}
                            />
                        </Routes>
                    </div>
                </>
            ) : (
                <AuthPage setUser={setUser} />
            )}
        </main>
    );
}
