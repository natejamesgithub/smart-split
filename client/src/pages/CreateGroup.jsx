import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { useState } from "react"; 
import { api } from "../utils/api";
// import axios from "axios"; 

const CreateGroup = () => {
    const { user } = useAuth(); 
    const [groupName, setGroupName] = useState("");
    const [members, setMembers] = useState([""]); 
    const [error, setError] = useState(null);
    const navigate = useNavigate(); 

    const handleAddMember = () => {
        setMembers([...members, ""]); 
    }; 

    const handleMemberChange = (index, value) => {
        const updated = [...members];
        updated[index] = value; 
        setMembers(updated);
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        if (!groupName || members.some((m) => !m)) {
            setError("Group name and all member emails are required.");
            return; 
        }

        try {
            await api.post("/api/groups", {
                name: groupName,
                members, 
                createdBy: user.email,
            }); 
            navigate("/dashboard"); 
        } catch (err) {
            console.error(err); 
            setError("Failed to create group."); 
        }
    }; 

    return (
        <div className = "min-h-screen flex items-center justify-center bg-gray-50">
            <form 
                onSubmit = {handleSubmit}
                className = "bg-white p-6 rounded shadow-md w-full max-w-lg"
            >
                <h2 className = "text-2xl font-bold mb-4 text-center">Create a Group</h2>
                { error && <p className = "text-red-500 text-sm mb-4">{error}</p>}

                <label className = "block mb-2 text-sm font-medium">Group Name</label>
                <input
                    type = "text"
                    value = {groupName}
                    onChange = {(e) => setGroupName(e.target.value)}
                    className = "w-full px-3 py-2 border rounded mb-4"
                    required
                />
                <label className = "block mb-2 text-sm font-medium">Group Members (Emails)</label>
                {members.map((member, idx) => (
                    <input
                        key = {idx}
                        type = "email"
                        value = {member}
                        onChange = {(e) => handleMemberChange(idx, e.target.value)}
                        className = "w-full px-3 py-2 border rounded mb-2"
                        required
                    />
                ))}

                <button
                    type = "button"
                    onClick = {handleAddMember}
                    className = "text-blue-600 text-sm mb-4 hover:underline"
                >
                    + Add another member
                </button>
                <button
                    type = "submit"
                    className = "w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    Create Group
                </button>
            </form>
        </div>
    ); 
}; 

export default CreateGroup; 