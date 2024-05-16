import './BalanceList.css'
export default function BalanceList({ balances, groupMembers }) {
    return (
        <div className="balance-list">
            <h4>Balance Summary</h4>
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
