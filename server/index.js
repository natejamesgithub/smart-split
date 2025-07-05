const express = require("express");
const cors = require("cors");
const router = express.Router(); 
const mongoose = require("mongoose");
require("dotenv").config();

// Initialize Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.error("MongoDB connection error:", err));

// Routes
const groupRoutes = require("./routes/groups");
const expenseRoutes = require("./routes/expenses");
app.use("/api/groups", groupRoutes);
app.use("/api/expenses", expenseRoutes);

// Test route
app.get("/api/health", (req, res) => res.send("API is alive!"));

app.get("/", (req, res) => {
  res.send("Smart Split API is running!");
});

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = router; 