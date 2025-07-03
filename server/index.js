const groupRoutes = require("./routes/groups"); 
app.use("/api/groups", groupRoutes); 

const expenseRoutes = require("./routes/expenses"); 
app.use("/api/expenses", expenseRoutes); 