const express = require("express");
const router = express.Router();
const Expense = require("../models/Expense");

// DELETE /api/expenses/:id
router.delete("/:id", async (req, res) => {
  console.log("DELETE route hit with ID:", req.params.id);
  try {
    const result = await Expense.findByIdAndDelete(req.params.id);
    if (!result) {
      console.log("Expense not found");
      return res.status(404).json({ error: "Expense not found" });
    }
    console.log("Deleted expense:", result._id);
    res.sendStatus(204);
  } catch (err) {
    console.error("Delete failed:", err);
    res.status(500).json({ error: "Failed to delete expense" });
  }
});

// GET /api/expenses?groupId=...
router.get("/", async (req, res) => {
  const { groupId } = req.query;
  if (!groupId) return res.status(400).json({ message: "Missing groupId." });
  try {
    const expenses = await Expense.find({ groupId });
    res.json(expenses);
  } catch (err) {
    console.error("Error fetching expenses:", err);
    res.status(500).json({ message: "Server error fetching expenses." });
  }
});

// POST /api/expenses
router.post("/", async (req, res) => {
  const { description, amount, payer, splitBetween, groupId } = req.body;
  if (!description || !amount || !payer || !splitBetween || !groupId) {
    return res.status(400).json({ message: "Missing fields." });
  }
  try {
    const expense = new Expense({ description, amount, payer, splitBetween, groupId });
    await expense.save();
    res.status(201).json(expense);
  } catch (err) {
    console.error("Error saving expense:", err);
    res.status(500).json({ message: "Server error saving expense." });
  }
});

module.exports = router;
