import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const { user, logout } = useAuth(); 
    const navigate = useNavigate(); 

    const handleLogout = async () => {
        await logout(); 
        navigate("/login");
    }; 

    return (
        <div>
            <div>
                <h1>Welcome, {user?.email}</h1>
                <p>
                    This will eventually show your groups, balances, and recent activity. 
                </p>
                <button
                    onClick = {handleLogout}
                >
                    Log Out
                </button>
            </div>
        </div>
    );
}; 

export default Dashboard; 

