const mongoose = require("mongoose"); 
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
}); 




const groupRoutes = require("./routes/groups"); 
app.use("/api/groups", groupRoutes); 

const expenseRoutes = require("./routes/expenses"); 
app.use("/api/expenses", expenseRoutes); 