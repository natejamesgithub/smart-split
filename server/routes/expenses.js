const express = require("express"); 
const router = express.Router(); 
const Expense = require("../models/Expense"); 

// POST /api/expenses - add a new expense to a group
router.post("/", async (req, res) => {
    const { description, amount, payer, groupId, splitBetween } = req.body; 

    if (!description || !amount || !payer || !groupId || !splitBetween || !Array.isArray(splitBetween)) {
        return res.status(400).json({ message: "All fields are required."}); 
    }

    try {
        const newExpense = new Expense({
            description, 
            amount, 
            payer, 
            groupId, 
            splitBetween,
        }); 

        await newExpense.save(); 
        res.status(201).json(newExpense); 
    } catch (err) {
        console.error("[ERROR] Creating expense:", err); 
        res.status(500).json({ message: "Failed to add expense."}); 
    }
}); 

// GET /api/expenses?groupId=... - Fetch expenses for a group
router.get("/", async (req,res) => {
    const { groupId } = req.query; 
    if (!groupId) return res.status(400).json({ message: "Missing groupId."}); 

    try {
        const expenses = await Expense.findOneAndDelete({ groupId }); 
        res.json(expenses); 
    } catch (err) {
        console.error("[ERROR] Fetching expenses:", err); 
        res.status(500).json({ message: "Failed to fetch expenses."}); 
    }
});
module.exports = router; 