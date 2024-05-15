import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as groupsAPI from "../../utilities/groups-api";

export default function GroupEditForm({ currentUser }) {
    const { id } = useParams();
    const [group, setGroup] = useState({
        groupName: "",
        type: "",
    });
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchGroup() {
            const groupData = await groupsAPI.getGroup(id);
            setGroup(groupData);
        }
        fetchGroup();
    }, [id]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setGroup({ ...group, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await groupsAPI.updateGroup(id, group);
            navigate(`/groups/${id}`);
        } catch (error) {
            console.error("Error:", error.message);
        }
    };

    return (
        <div>
            <h1>Edit Group Details</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Group Name:
                    <input
                        type="text"
                        name="groupName"
                        value={group.groupName}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Group Type:
                    <select name="type" value={group.type} onChange={handleChange} required>
                        <option value="Household">Household</option>
                        <option value="Trip">Trip</option>
                        <option value="Family">Family</option>
                        <option value="Friends">Friends</option>
                        <option value="Event">Event</option>
                        <option value="Other">Other</option>
                    </select>
                </label>
                <button type="submit" >Save Changes</button>
            </form>
        </div>
    );
}
