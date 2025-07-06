import { useState } from "react";
import axios from "axios";

const AddPaymentForm = ({ groupId, members, currentUser, onAdd }) => {
  const [payee, setPayee] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE}/api/payments`, {
        groupId,
        payer: currentUser,
        payee,
        amount: parseFloat(amount),
      });
      onAdd(res.data);
      setPayee("");
      setAmount("");
    } catch (err) {
      console.error("Payment failed:", err);
      alert("Failed to log payment.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 bg-green-50 p-4 rounded">
      <h3 className="text-md font-semibold mb-2">Settle Up</h3>
      <div className="flex gap-2 items-center">
        <select
          value={payee}
          onChange={(e) => setPayee(e.target.value)}
          className="border px-2 py-1 rounded"
          required
        >
          <option value="">Select Payee</option>
          {members.filter(m => m !== currentUser).map(m => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border px-2 py-1 rounded w-24"
          min="0.01"
          step="0.01"
          required
        />
        <button className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">
          Pay
        </button>
      </div>
    </form>
  );
};

export default AddPaymentForm;