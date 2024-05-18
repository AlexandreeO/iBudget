import './InviteMember.css'

export default function InviteMember({ onInvite, email, setEmail, message }) {

   
    return (
        <div className="invite-member">
            <h2>Invite Friends</h2>
            <form onSubmit={onInvite}>
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
