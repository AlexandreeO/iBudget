import { useState } from "react";
import * as groupsAPI from "../../utilities/groups-api";

export default function CreateGroupPage({ setGroupList }) {
    const [groupName, setGroupName] = useState("");
    const [type, setType] = useState(""); // State for group type

    const [error, setError] = useState("");

    const handleSubmit = async (evt) => {
        evt.preventDefault();

        try {
            // Call the create function from groups-api.js to create a new group
            const newGroup = await groupsAPI.create({ 
                groupName: groupName,
                type: type // Include group type in the request
            });

            setGroupList((currentGroupList) => [...currentGroupList, newGroup]);

            // Reset the groupName and type state after successfully creating the group
            setGroupName("");
            setType("");
        } catch (error) {
            console.error("Error:", error.message);
            setError("Failed to create group. Please try again.");
        }
    };

    const handleChange = async (evt) => {
        if (evt.target.name === "groupName") {
            setGroupName(evt.target.value);
        } else if (evt.target.name === "type") {
            setType(evt.target.value);
        }
        setError("");
    };

    return (
        <div>
            <h1>Create a new Group</h1>
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
                    <label>Group type</label>
                    <select
                        name="type" // Set name attribute for group type
                        value={type} // Bind selected value to type state
                        onChange={handleChange} // Call handleChange when group type changes
                        required
                    >
                        <option value="">Select Group type</option>
                        <option value="Household">Household</option>
                        <option value="Trip">Trip</option>
                        <option value="Family">Family</option>
                        <option value="Friends">Friends</option>
                        <option value="Event">Event</option>
                        <option value="Other">Other</option>
                    </select>
                    <button type="submit">Save</button>
                </form>
            </div>
            {/* <p className="error-message">&nbsp;{error}</p> */}
        </div>
    );
}
