import mongoose from "mongoose";

const loanSchema = new mongoose.Schema({
   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
   tokenId: { type: mongoose.Schema.Types.ObjectId, ref: "RWAToken", required: true },
   loanAmount: { type: Number, required: true },
   interestRate: { type: Number, default: 10 },
   status: { type: String, enum: ["active", "repaid"], default: "active" },
}, { timestamps: true });

export default mongoose.model("Loan", loanSchema);
