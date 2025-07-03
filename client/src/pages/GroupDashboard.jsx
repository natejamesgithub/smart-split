import { useEffect, useState } from "react"; 
import { useParams } from "react-router-dom"; 
import axios from "axios"; 

const GroupDashboard = () => {
    const { id } = useParams(); 
    const [group, setGroup] = useState(null); 
    const [expenses, setExpenses] = useState([]); 
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const fetchGroupAndExpenses = async () => {
            try {
                const [groupRes, expenseRes] = await Promise.all([
                    axios.get(`${import.meta.env.VITE_API_BASE}/api/groups/${id}`),
                    axios.get(`${import.meta.env.VITE_API_BASE}/api/expenses?groupId=${id}`),
                ]);  
                setGroup(groupRes.data); 
                setExpenses(expenseRes.data);
            } catch (err) {
                console.error("Error loading group/expenses:", err); 
            } finally {
                setLoading(false); 
            }
        }; 
        fetchGroupAndExpenses(); 
    }, [id]); 

    const handleAddExpense = (newExpense) => {
        setExpenses((prev) => [...prev, newExpense]); 
    }; 

    const calculateBalances = () => {
        const balances = {}; 
        group?.members.forEach((member) => (balances[member] = 0)); 

        expenses.forEach(({ amount, payer, splitBetween }) => {
            const splitAmount = amount / splitBetween.length; 
            splitBetween.forEach((member) => {
                if(member !== payer) {
                    balances[member] -=splitAmount; 
                    balances[payer] += splitAmount; 
                }
            }); 
        }); 
        return balances; 
    }

    if (loading) return <p className = "p-6">Loading group...</p>; 
    if (!group) return <p className = "p-6">Group not found.</p>;

    const balances = calculateBalances(); 

    return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded shadow p-6">
        <h1 className="text-2xl font-bold mb-2">{group.name}</h1>
        <p className="mb-4 text-gray-600">Created by: {group.createdBy}</p>

        <AddExpenseForm
          groupId={group._id}
          members={group.members}
          onAdd={handleAddExpense}
        />

        <h2 className="text-lg font-semibold mb-2">Expenses</h2>
        <ul className="mb-6 space-y-2">
          {expenses.map((e) => (
            <li key={e._id} className="border px-3 py-2 rounded bg-gray-50">
              <strong>{e.description}</strong> — ${e.amount.toFixed(2)} paid by {e.payer}
            </li>
          ))}
        </ul>

        <h2 className="text-lg font-semibold mb-2">Balances</h2>
        <ul className="list-disc list-inside text-gray-700">
          {Object.entries(balances).map(([member, balance]) => (
            <li key={member}>
              {member} {balance < 0 ? `owes $${Math.abs(balance).toFixed(2)}` : `is owed $${balance.toFixed(2)}`}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GroupDashboard; 