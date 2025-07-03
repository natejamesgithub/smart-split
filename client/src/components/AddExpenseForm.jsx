import { useState } from "react"; 
import { api } from "../utils/api";

const AddExpenseForm = ({ groupId, members, onAdd }) => {
    const [description, setDescription] = useState(""); 
    const [amount, setAmount] = useState(""); 
    const [payer, setPayer] = useState(members[0] || ""); 
    const [error, setError] = useState(null); 

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        if (!description || !amount || !payer){
            return setError("All fields are required.");
        }

        try {
            const res = await api.post("/api/expenses", {
                description, 
                amount: parseFloat(amount), 
                payer, 
                groupId, 
                splitBetween: members, 
            }); 
            onAdd(res.data); 
            setDescription(""); 
            setAmount(""); 
            setPayer(members[0] || ""); 
            setError(null); 
        } catch (err) {
            console.error("Error adding expense:", err);
            setError("Failed to add expense."); 
        }
    }; 

    return (
        <form onSubmit = {handleSubmit} className = "bg-gray-50 p-4 rounded shadow mb-6">
            <h3 className = "text-lg font-semibold mb-2">Add Expense</h3>
            {error && <p className = "text-red-500 text-sm mb-2">{error}</p>}

            <input
                type = "text"
                placeholder = "Description"
                value = {description}
                onChange = {(e) => setDescription(e.target.value)}
                className = "w-full mb-2 p-2 border rounded"
                required
            />

            <input
                type = "number"
                placeholder = "Amount (USD)"
                value = {amount}
                onChange = {(e) => setAmount(e.target.value)}
                className = "w-full mb-2 p-2 border rounded"
                required
            />

            <select
                value = {payer}
                onChange = {(e) => setPayer(e.target.value)}
                className = "w-full mb-3 p-2 border rounded"
                required
            >
                {members.map((m, idx) => (
                    <option key = {idx} value = {m}>{m}</option>
                ))}
            </select>

            <button
                type = "submit"
                className = "w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
            >
                Add Expense
            </button>
        </form>
    );
};

export default AddExpenseForm; 