import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react"; 
import axios from "axios"; 

const Dashboard = () => {
    const { user, logout } = useAuth(); 
    const navigate = useNavigate(); 
    const [groups, setGroups] = useState([]); 
    const [recentExpenses, setRecentExpenses] = useState([]); 
    const [loading, setLoading] = useState(true); 

    const handleLogout = async () => {
        await logout(); 
        navigate("/login");
    }; 

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const groupRes = await axios.get(`${import.meta.env.VITE_API_BASE}/api/groups?user=${user.email}`); 
                setGroups(groupRes.data); 

                // Gather all expenses from all groups
                const expensePromises = groupRes.data.map((group) => 
                    axios.get(`${import.meta.env.VITE_API_BASE}/api/expenses?groupId=${group._id}`)
                ); 
                const expenseResults = await Promise.all(expensePromises); 
                const allExpenses = expenseResults.flatMap(res => res.data); 

                // Sort expenses
                const recent = [...allExpenses].filter((e) => e && e.description && e.amount && e.payer).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);
                setRecentExpenses(recent); 
            } catch (err) {
                console.error("Dashboard fetch error:", err); 
            } finally {
                setLoading(false); 
            }
        }; 
        if (user?.email) fetchDashboardData(); 
    }, [user]); 

    return (
     <div className="min-h-screen bg-gray-100 p-6">
       <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Welcome, {user?.email}</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Log Out
          </button>
        </div>
        {loading ? (
          <p>Loading dashboard...</p>
        ) : (
          <>
            {/* My Groups */}
            <section className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-semibold">My Groups</h2>
                <Link to="/create-group" className="text-blue-600 hover:underline text-sm">
                  + Create Group
                </Link>
              </div>
              {groups.length === 0 ? (
                <p className="text-gray-500">You’re not in any groups yet.</p>
              ) : (
                <ul className="grid gap-2">
                  {groups.map((group) => (
                    <li key={group._id} className="bg-white p-3 rounded shadow">
                      <Link to={`/group/${group._id}`} className="font-medium text-blue-700 hover:underline">
                        {group.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            {/* Recent Activity */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-2">Recent Activity</h2>
              {recentExpenses.length === 0 ? (
                <p className="text-gray-500">No expenses recorded yet.</p>
              ) : (
                <ul className="space-y-2">
                  {recentExpenses.map((exp) => (
                    <li key={exp._id} className="bg-white p-3 rounded shadow text-sm">
                      <strong>{exp.description}</strong> — ${exp.amount.toFixed(2)} paid by {exp.payer}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </>
        )}
      </div>
    </div>     
    );
}; 

export default Dashboard; 

