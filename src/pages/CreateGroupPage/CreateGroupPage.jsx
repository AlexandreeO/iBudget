import {useState} from 'react';

export default function CreateGroupPage() {
    const [groupName, setgroupName] = useState('');

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        console.log("testsubmit");
    };

    const handleChange = async (evt) => {
        evt.preventDefault();
        console.log("testchange");
    };

    return (
        <div>
            <h1>Add a new Group</h1>
            <div className="form-container">
                <form autoComplete="off" onSubmit={handleSubmit}>
                    <label>Group Name</label>
                    <input
                        type="text"
                        name="groupName"
                        value={groupName}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit">Save</button>
                </form>
            </div>
            {/* <p className="error-message">&nbsp;{error}</p> */}
        </div>
    );
}
