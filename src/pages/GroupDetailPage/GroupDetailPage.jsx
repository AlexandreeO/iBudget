import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import * as groupsAPI from "../../utilities/groups-api";

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
    const navigate = useNavigate();

    useEffect(function() {
        async function getGroupExpenses() {
            const groupExpenses = await groupsAPI.getGroupExpenses(id);
            setGroupExpenses(groupExpenses);
        }
        getGroupExpenses();
    }, [id]);

    const calculateBalances = (group, expenses) => {
        const memberBalances = {};
        const numMembers = group.groupMembers.length;

        group.groupMembers.forEach(member => {
            memberBalances[member._id] = 0;
        });
        //balances
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

    const handleChange = (event) => {
        const { name, value } = event.target;
        setExpense((prevExpense) => ({ ...prevExpense, [name]: value }));
    };

    const handleAddExpense = async (event) => {
        event.preventDefault();
        const newExpense = await groupsAPI.addExpense(id, expense);
        setExpense({ description: "", date: "", amount: "" });
        setGroupExpenses((prevExpenses) => [...prevExpenses, newExpense]);
    };

    const handleDeleteGroup = async () => {
        try {
            await groupsAPI.deleteGroup(id);
            navigate('/groups');
        } catch (error) {
            console.error("Error deleting group:", error.message);
        }
    };

    useEffect(function () {
        async function getGroup() {
            const groupData = await groupsAPI.getGroup(id);
            setGroup(groupData);
        }
        getGroup();
    }, [id]);

    useEffect(() => {
        if (group && groupExpenses.length) {
            const balances = calculateBalances(group, groupExpenses);
            setBalances(balances);
        }
    }, [group, groupExpenses]);

    return (
        <div>
            <h1>Group Details</h1>
            {group ? (
                <div>
                    <h2>{group.groupName}</h2>
                    <p>Type: {group.type}</p>
                    <p>Group Members: </p>
                    <ul>
                        {group.groupMembers.map(
                            (member) => (
                                <li key={member._id}>{member.name}</li>
                            ) // Assuming each member has a unique '_id'
                        )}
                    </ul>
                    <h4>Group Expenses</h4>
                    <ul>
                        {groupExpenses.map((expense) => (
                            <li key={expense._id}>
                                {" "}
                                {expense.description} - ${expense.amount} on{" "}
                                {new Date(expense.date).toLocaleDateString(undefined, {weekday:"long", year:"numeric", month:"short", day:"numeric" })} -by {expense.user.name}
                            </li>
                        ))}
                    </ul>
                    <h4>Group Balance</h4>
                    <ul>
                        {group.groupMembers.map(member => (
                            <li key={member._id}>
                                {member.name}: ${balances[member._id]?.toFixed(2)}
                            </li>
                        ))}
                    </ul>
                    {currentUser && currentUser._id === group.owner && (
                        <>
                            <button onClick={handleDeleteGroup}>Delete Group</button>
                            <Link to={`/groups/${id}/edit`} className="button btn-sm">Edit Group</Link>
                        </>
                    )}
                    <Link to={`/groups/${id}/summary`} className="button btn-sm">Summary</Link>
                </div>
            ) : (
                <p>You don't have any group yet</p>
            )}

            <h2>Invite Friends</h2>
            <form onSubmit={handleInviteMember}>
                <input
                    type="email"
                    name="userEmail"
                    placeholder="Enter user's email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit">Send Invite</button>
            </form>
            {message && <p>{message}</p>}

            <h2>Add Expense</h2>
            <form onSubmit={handleAddExpense}>
                <label>
                    Description:
                    <input
                        type="text"
                        name="description"
                        value={expense.description}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Date:
                    <input
                        type="date"
                        name="date"
                        value={expense.date}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Amount:
                    <input
                        type="number"
                        name="amount"
                        value={expense.amount}
                        onChange={handleChange}
                        required
                    />
                </label>
                <button type="submit">Add Expense</button>
            </form>
        </div>
    );
}
