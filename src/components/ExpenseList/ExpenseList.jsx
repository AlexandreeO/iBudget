import "./ExpenseList.css";
export default function ExpenseList({
    expenses,
    groupMembers,
    selectedMember,
    onMemberSelect,
}) {
    return (
        <div className="expense-list">
            <h4>Expenses</h4>
            <div id="filter">
                <select value={selectedMember} onChange={onMemberSelect}>
                    <option value="">All Members</option>
                    {groupMembers.map((member) => (
                        <option key={member._id} value={member._id}>
                            {member.name}
                        </option>
                    ))}
                </select>
            </div>
            <table className="table table-striped">
                <tbody>
                <tr>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Paid By</th>
                </tr>

                {expenses.map((expense) => (
                    <tr>
                        <td>{expense.description}</td>
                        <td>${expense.amount}</td>
                        <td>
                            {new Date(expense.date).toLocaleDateString(
                                undefined,
                                {
                                    weekday: "long",
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                }
                            )}
                        </td>
                        <td>{expense.user.name}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
