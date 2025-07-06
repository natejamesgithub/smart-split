const mongoose = require("mongoose"); 

const paymentSchema = new mongoose.Schema({
    groupId: { type: mongoose.Schema.Types.ObjectId, ref: "Group", required: true}, 
    payer: { type: String, required: true}, 
    payee: { type: String, required: true}, 
    amount: { type: Number, required: true}, 
    timestamp: { type: Date, default: Date.now }
}); 

module.exports = mongoose.model("Payment", paymentSchema)