import { useEffect, useState } from "react"; 
import { useParams } from "react-router-dom"; 
import AddExpenseForm from "../components/AddExpenseForm"; 
import axios from "axios"; 

const GroupDashboard = () => {
  const { id } = useParams(); 
  const [group, setGroup] = useState(null); 
  const [expenses, setExpenses] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [balances, setBalances] = useState({});

  useEffect(() => {
    const fetchGroupAndExpenses = async () => {
      try {
        const [groupRes, expenseRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_BASE}/api/groups/${id}`),
          axios.get(`${import.meta.env.VITE_API_BASE}/api/expenses?groupId=${id}`),
        ]);  
        setGroup(groupRes.data); 
        setExpenses(expenseRes.data || []);
      } catch (err) {
        console.error("Error loading group/expenses:", err); 
      } finally {
        setLoading(false); 
      }
    }; 
    fetchGroupAndExpenses(); 
  }, [id]); 

  useEffect(() => {
    if (!group || !Array.isArray(group.members)) return;

    const newBalances = {};
    group.members.forEach((member) => (newBalances[member] = 0));

    if (!Array.isArray(expenses)) return;

    expenses.forEach((expense) => {
      const { amount, payer, splitBetween } = expense;
      if (!amount || !payer || !Array.isArray(splitBetween)) return;

      const splitAmount = amount / splitBetween.length;
      splitBetween.forEach((member) => {
        if (member !== payer) {
          newBalances[member] -= splitAmount;
          newBalances[payer] += splitAmount;
        }
      });
    });

    setBalances(newBalances);
  }, [group, expenses]);

  const handleAddExpense = (newExpense) => {
    setExpenses((prev) => [...prev, newExpense]); 
  }; 

  const handleDeleteExpense = async (expenseId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE}/api/expenses/${expenseId}`);
      setExpenses((prev) => prev.filter((e) => e._id !== expenseId));
    } catch (err) {
      console.error("Failed to delete expense:",err); 
      alert("Something went wrong while deleting the expense."); 
    }
  }; 

  if (loading) return <p className="p-6">Loading group...</p>; 
  if (!group || !Array.isArray(group.members)) return <p className="p-6 text-red-500">Group not found or invalid group data.</p>;

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
        {!Array.isArray(expenses) || expenses.length === 0 ? (
          <p className="text-gray-500">No expenses yet.</p>
        ) : (
          <ul className="mb-6 space-y-2">
            {expenses.map((e) => (
              <li
                key={e._id}
                className="border px-3 py-2 rounded bg-gray-50 flex justify-between items-center"
              >
                <div>
                  <strong>{e.description}</strong> — ${e.amount?.toFixed(2) ?? "0.00"} paid by {e.payer}
                </div>
                <button
                  onClick={() => handleDeleteExpense(e._id)}
                  className="text-red-500 hover:text-red-700 text-sm ml-4"
                >
                  🗑️ Delete
                </button>
              </li>
            ))}
        </ul>
        )}

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