const express = require("express");
const router = express.Router();
const Payment = require("../models/Payment");

// GET /api/payments?groupId=...
router.get("/", async (req, res) => {
  try {
    const payments = await Payment.find({ groupId: req.query.groupId });
    res.json(payments);
  } catch (err) {
    console.error("Failed to fetch payments:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// POST /api/payments
router.post("/", async (req, res) => {
  try {
    const newPayment = new Payment(req.body);
    await newPayment.save();
    res.status(201).json(newPayment);
  } catch (err) {
    console.error("Failed to create payment:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;