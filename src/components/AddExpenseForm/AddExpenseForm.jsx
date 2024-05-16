import './AddExpenseForm.css'
export default function AddExpenseForm({ onAddExpense, expense, setExpense }) {
    const handleChange = (event) => {
        const { name, value } = event.target;
        setExpense(prevExpense => ({ ...prevExpense, [name]: value }));
    };

    return (
        <div className="add-expense-form">
            <h2>Add Expense</h2>
        <form onSubmit={onAddExpense}>
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
