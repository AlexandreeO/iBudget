import './GroupInfo.css'
export default function GroupInfo({ group }) {
    return (




        <div className="group-info">
           
            <h2>{group.groupName}</h2>
            
            <p className="badge text-bg-primary">{group.type}</p>
            <p>Group Members:</p>
            <ul>
                {group.groupMembers.map(member => (
                    <li key={member._id}>{member.name}</li>
                ))}
            </ul>
        </div>
    );
}