import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import * as groupsAPI from "../../utilities/groups-api";
import GroupInfo from '../../components/GroupInfo/GroupInfo.jsx';
import ExpenseList from '../../components/ExpenseList/ExpenseList.jsx';
import BalanceList from '../../components/BalanceList/BalanceList.jsx';
import InviteMember from '../../components/InviteMember/InviteMember.jsx';
import AddExpenseForm from '../../components/AddExpenseForm/AddExpenseForm.jsx';
import './GroupDetailPage.css';

export default function GroupDetailPage({ currentUser }) {
    const { id } = useParams();
    const [group, setGroup] = useState(null);
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [expense, setExpense] = useState({
        description: "",
        date: "",
        amount: "",
    });
    const [groupExpenses, setGroupExpenses] = useState([]);
    const [balances, setBalances] = useState({});
    const [selectedMember, setSelectedMember] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchGroupAndExpenses() {
            const groupData = await groupsAPI.getGroup(id);
            setGroup(groupData);
            const groupExpensesData = await groupsAPI.getGroupExpenses(id);
            setGroupExpenses(groupExpensesData);
        }
        fetchGroupAndExpenses();
    }, [id]);

    useEffect(() => {
        if (group && groupExpenses.length) {
            const newBalances = calculateBalances(group, groupExpenses);
            setBalances(newBalances);
        }
    }, [group, groupExpenses]);

    const filteredExpenses = selectedMember 
        ? groupExpenses.filter(expense => expense.user._id === selectedMember)
        : groupExpenses;

    const calculateBalances = (group, expenses) => {
        const memberBalances = {};
        const numMembers = group.groupMembers.length;

        group.groupMembers.forEach(member => {
            memberBalances[member._id] = 0;
        });

        expenses.forEach(expense => {
            const share = expense.amount / numMembers;
            group.groupMembers.forEach(member => {
                if (expense.user._id === member._id) {
                    memberBalances[member._id] += (expense.amount - share);
                } else {
                    memberBalances[member._id] -= share;
                }
            });
        });

        return memberBalances;
    };

    const handleInviteMember = async (event) => {
        event.preventDefault();
        try {
            await groupsAPI.inviteMember(id, email);
            setMessage("Invitation sent successfully!");
            setEmail("");
        } catch (error) {
            setMessage(error.response.data.message);
        }
    };

    const handleAddExpense = async (event) => {
        event.preventDefault();
        const newExpense = await groupsAPI.addExpense(id, expense);
        setExpense({ description: "", date: "", amount: "" });
        setGroupExpenses(prevExpenses => [...prevExpenses, newExpense]);
    };

    const handleDeleteGroup = async () => {
        try {
            await groupsAPI.deleteGroup(id);
            navigate('/groups');
        } catch (error) {
            console.error("Error deleting group:", error.message);
        }
    };

    const handleMemberSelect = (event) => {
        setSelectedMember(event.target.value);
    };

    return (
        <div className="main-content">
            <div className="header">Group Details</div>
            {group ? (
                <>
                    <GroupInfo group={group} />
                    <ExpenseList

                        expenses={filteredExpenses}
                        groupMembers={group.groupMembers}
                        selectedMember={selectedMember}
                        onMemberSelect={handleMemberSelect}
                    />
                    <BalanceList balances={balances} groupMembers={group.groupMembers} />
                    {currentUser && currentUser._id === group.owner && (
                        <>
                            <button className="button btn-sm" onClick={handleDeleteGroup}>Delete Group</button>
                            <Link to={`/groups/${id}/edit`} className="button btn-sm">Edit Group</Link>
                        </>
                    )}
                    <Link to={`/groups/${id}/summary`} className="button btn-sm">Summary</Link>
                </>
            ) : (
                <p>You don't have any group yet</p>
            )}
            <InviteMember
                onInvite={handleInviteMember}
                email={email}
                setEmail={setEmail}
                message={message}
            />
            <AddExpenseForm
                onAddExpense={handleAddExpense}
                expense={expense}
                setExpense={setExpense}
            />
        </div>
    );
}


// import { useParams, useNavigate, Link } from "react-router-dom";
// import { useEffect, useState } from "react";
// import * as groupsAPI from "../../utilities/groups-api";

// export default function GroupDetailPage({ currentUser }) {
//     const { id } = useParams();
//     const [group, setGroup] = useState(null);
//     const [email, setEmail] = useState("");
//     const [message, setMessage] = useState("");
//     const [expense, setExpense] = useState({
//         description: "",
//         date: "",
//         amount: "",
//     });
//     const [groupExpenses, setGroupExpenses] = useState([]);
//     const [balances, setBalances] = useState({});
//     const [selectedMember, setSelectedMember] = useState("");
//     const navigate = useNavigate();

//     useEffect(function() {
//         async function getGroupExpenses() {
//             const groupExpenses = await groupsAPI.getGroupExpenses(id);
//             setGroupExpenses(groupExpenses);
//         }
//         getGroupExpenses();
//     }, [id]);

//     const calculateBalances = (group, expenses) => {
//         const memberBalances = {};
//         const numMembers = group.groupMembers.length;

//         group.groupMembers.forEach(member => {
//             memberBalances[member._id] = 0;
//         });

//         //balances
//         expenses.forEach(expense => {
//             const share = expense.amount / numMembers;
//             group.groupMembers.forEach(member => {
//                 if (expense.user._id === member._id) {
//                     memberBalances[member._id] += (expense.amount - share);
//                 } else {
//                     memberBalances[member._id] -= share;
//                 }
//             });
//         });

//         return memberBalances;
//     };

//     const handleInviteMember = async (event) => {
//         event.preventDefault();
//         try {
//             await groupsAPI.inviteMember(id, email);
//             setMessage("Invitation sent successfully!");
//             setEmail("");
//         } catch (error) {
//             setMessage(error.response.data.message);
//         }
//     };

//     const handleChange = (event) => {
//         const { name, value } = event.target;
//         setExpense((prevExpense) => ({ ...prevExpense, [name]: value }));
//     };

//     const handleAddExpense = async (event) => {
//         event.preventDefault();
//         const newExpense = await groupsAPI.addExpense(id, expense);
//         setExpense({ description: "", date: "", amount: "" });
//         setGroupExpenses((prevExpenses) => [...prevExpenses, newExpense]);
//     };

//     const handleDeleteGroup = async () => {
//         try {
//             await groupsAPI.deleteGroup(id);
//             navigate('/groups');
//         } catch (error) {
//             console.error("Error deleting group:", error.message);
//         }
//     };

//     const handleMemberSelect = (event) => {
//         setSelectedMember(event.target.value);
//     };

//     useEffect(function () {
//         async function getGroup() {
//             const groupData = await groupsAPI.getGroup(id);
//             setGroup(groupData);
//         }
//         getGroup();
//     }, [id]);

//     useEffect(() => {
//         if (group && groupExpenses.length) {
//             const balances = calculateBalances(group, groupExpenses);
//             setBalances(balances);
//         }
//     }, [group, groupExpenses]);

//     const filteredExpenses = selectedMember 
//         ? groupExpenses.filter(expense => expense.user._id === selectedMember)
//         : groupExpenses;

//     return (
//         <div>
//             <h1>Group Details</h1>
//             {group ? (
//                 <div>
//                     <h2>{group.groupName}</h2>
//                     <p>Type: {group.type}</p>
//                     <p>Group Members: </p>
//                     <ul>
//                         {group.groupMembers.map(
//                             (member) => (
//                                 <li key={member._id}>{member.name}</li>
//                             ) // Assuming each member has a unique '_id'
//                         )}
//                     </ul>
//                     <h4>Group Expenses</h4>
//                     <label>Filter by member: </label>
//                     <select value={selectedMember} onChange={handleMemberSelect}>
//                         <option value="">All Members</option>
//                         {group.groupMembers.map(member => (
//                             <option key={member._id} value={member._id}>{member.name}</option>
//                         ))}
//                     </select>
//                     <ul>
//                         {filteredExpenses.map((expense) => (
//                             <li key={expense._id}>
//                                 {" "}
//                                 {expense.description} - ${expense.amount} on{" "}
//                                 {new Date(expense.date).toLocaleDateString(undefined, {weekday:"long", year:"numeric", month:"short", day:"numeric" })} - by {expense.user.name}
//                             </li>
//                         ))}
//                     </ul>
//                     <h4>Group Balance</h4>
//                     <ul>
//                         {group.groupMembers.map(member => (
//                             <li key={member._id}>
//                                 {member.name}: ${balances[member._id]?.toFixed(2)}
//                             </li>
//                         ))}
//                     </ul>
//                     {currentUser && currentUser._id === group.owner && (
//                         <>
//                             <button onClick={handleDeleteGroup}>Delete Group</button>
//                             <Link to={`/groups/${id}/edit`} className="button btn-sm">Edit Group</Link>
//                         </>
//                     )}
//                     <Link to={`/groups/${id}/summary`} className="button btn-sm">Summary</Link>
//                 </div>
//             ) : (
//                 <p>You don't have any group yet</p>
//             )}

//             <h2>Invite Friends</h2>
//             <form onSubmit={handleInviteMember}>
//                 <input
//                     type="email"
//                     name="userEmail"
//                     placeholder="Enter user's email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                 />
//                 <button type="submit">Send Invite</button>
//             </form>
//             {message && <p>{message}</p>}

//             <h2>Add Expense</h2>
//             <form onSubmit={handleAddExpense}>
//                 <label>
//                     Description:
//                     <input
//                         type="text"
//                         name="description"
//                         value={expense.description}
//                         onChange={handleChange}
//                         required
//                     />
//                 </label>
//                 <label>
//                     Date:
//                     <input
//                         type="date"
//                         name="date"
//                         value={expense.date}
//                         onChange={handleChange}
//                         required
//                     />
//                 </label>
//                 <label>
//                     Amount:
//                     <input
//                         type="number"
//                         name="amount"
//                         value={expense.amount}
//                         onChange={handleChange}
//                         required
//                     />
//                 </label>
//                 <button type="submit">Add Expense</button>
//             </form>
//         </div>
//     );
// }
