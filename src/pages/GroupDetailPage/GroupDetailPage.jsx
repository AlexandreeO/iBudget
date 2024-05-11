import {useParams} from 'react-router-dom';
import { useEffect, useState } from 'react';
import * as groupsAPI from '../../utilities/groups-api'

export default function GroupDetailPage() {
    const { id } = useParams();
    const [group, setGroup] = useState(null);
    const [email, setEmail] = useState('');
    const [message, setMessage]=useState('')

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await groupsAPI.inviteMember(id, email);
            setMessage('Invitation sent successfully!');
            setEmail('');
        } catch (error) {
            setMessage(error.response.data.message);
        }
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
            <form onSubmit={handleSubmit}>
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
        </div>
    );
}
