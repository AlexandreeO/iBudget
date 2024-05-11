import {useParams} from 'react-router-dom';
import { useEffect, useState } from 'react';
import * as groupsAPI from '../../utilities/groups-api'

export default function GroupDetailPage() {
    const { id } = useParams();
    const [group, setGroup] = useState(null);
    const [email, setEmail] = useState('');
    const [message, setMessage]=useState('')
    const [expense, setExpense] = useState({
        
        description: '',
        date: '',
        amount: ''
    });

    


    const handleInviteMember = async (event) => {
        event.preventDefault();
        try {
            await groupsAPI.inviteMember(id, email);
            setMessage('Invitation sent successfully!');
            setEmail('');
        } catch (error) {
            setMessage(error.response.data.message);
        }
    }

  

    const handleChange = (event)=>{
        const {name, value }= event.target;
        setExpense(prevExpense=>({...prevExpense, [name]:value}))
    }

    const handleAddExpense = async(event)=>{
        event.preventDefault();
        const newExpense = await groupsAPI.addExpense(id, expense);
        setExpense({ description: '', date: '', amount: '' });
    }

    useEffect(function (){
        async function getGroup (){
            const groupData = await groupsAPI.getGroup(id);
            setGroup(groupData);
            console.log(group)
        }
        getGroup();
    },[])
  return (
        <div>
            <h1>Group Details</h1>
            {group ? (
                <div>
                    <h2>{group.groupName}</h2>
                    <p>Type: {group.type}</p>
                    <p>Group Members:</p>
                    <ul>
        {group.groupMembers.map(member => 
            <li key={member._id}>{member.name}</li>  // Assuming each member has a unique '_id'
        )}
    </ul>
                    {/* Additional group details can be rendered here */}
                </div>
            ) : (
                <p>You don't have any  group yet</p>
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
