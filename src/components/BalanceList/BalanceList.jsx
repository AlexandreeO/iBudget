import './BalanceList.css'
export default function BalanceList({ balances, groupMembers }) {
    return (
        <div className="balance-list">
        <ul>
            {groupMembers.map(member => (
                <li key={member._id}>
                    {member.name}: ${balances[member._id]?.toFixed(2)}
                </li>
            ))}
        </ul>
        </div>
    );
}
