import { useEffect, useState } from "react"; 
import { useParams } from "react-router-dom"; 
import axios from "axios"; 

const GroupDashboard = () => {
    const { id } = useParams(); 
    const [group, setGroup] = useState(null); 
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const fetchGroup = async () => {
            try {
                const res = await axios.get(`/api/groups/${id}`); 
                setGroup(res.data); 
            } catch (err) {
                console.error("Error loading group:", err); 
            } finally {
                setLoading(false); 
            }
        }; 
        fetchGroup(); 
    }, [id]); 

    if (loading) return <p className = "p-6">Loading group...</p>; 
    if (!group) return <p className = "p-6">Group not found.</p>;

    return (
        <div className = "min-h-screen bg-gray-100 p-6">
            <div className = "max-w-4xl mx-auto bg-white rounded shadow p-6">
                <h1 className = "text-2xl font-bold mb-2">{group.name}</h1>
                <p className = "mb-4 text-gray-600">Created by: {group.createdBy}</p>

                <h2 className = "text-lg font-semibold mb-2">Members</h2>
                <ul className = "mb-6 list-disc list-inside">
                    {group.members.map((email, idx) => (
                        <li key = {idx}>{email}</li>
                    ))}
                </ul>

                <p className = "italic text-gray-500">Expenses and balances will go here.</p>
            </div>
        </div>
    ); 
}; 

export default GroupDashboard; 