import { useEffect, useState } from "react"; 
import { useAuth } from "../context/AuthContext"; 
import { Link } from "react-router-dom"; 
import axios from "axios"; 

const GroupList = () => {
    const { user } = useAuth(); 
    const [groups, setGroups] = useState([]); 
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_BASE}/api/groups?user=${user.email}`);
                setGroups(res.data); 
            } catch (err) {
                console.error("Error fetching groups:", err); 
            } finally {
                setLoading(false); 
            }
        }; 
        
        if (user?.email) fetchGroups(); 
    }, [user]); 

    return (
        <div className = "min-h-screen bg-gray-100 p-6">
            <div className = "max-w-3xl mx-auto bg-white rounded shadow p-6">
                <h1 className = "text-2xl font-bold mb-4">Your Groups</h1>
                {loading ? (
                    <p>Loading...</p>
                ) : groups.length === 0 ? (
                    <p>No groups found. <Link to = "/create-group" className = "text-blue-600 hover:underline">Create one</Link></p>
                ) : (
                    <ul className = "space-y-3">
                        {groups.map((group) => (
                            <li key = {group._id} className = "border px-4 py-2 rounded hover:bg-gray-50">
                                <Link to = {`/group/${group._id}`} className = "text-lg font-medium text-blue-600 hover:underline">
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    ); 
}; 

export default GroupList; 