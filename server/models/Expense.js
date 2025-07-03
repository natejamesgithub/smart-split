const mongoose = require("mongoose"); 

const expenseSchema = new mongoose.Schema(
    {
        description: {
            type: String, 
            required: true,
        }, 
        amount: {
            type: Number, 
            required: true, 
        }, 
        payer: {
            type: String, 
            required: true, 
        }, 
        groupId: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Group", 
            required: true, 
        }, 
        splitBetween: [
            {
                type: String, 
                required: true,
            }
        ], 
    }, 
    { timestamps: true }
); 

module.exports = mongoose.model("Expense", expenseSchema); 