import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
   walletAddress: { type: String, required: true, unique: true },
   nonce: { type: String, required: true }, // used for signature challenge
}, { timestamps: true });

export default mongoose.model("User", userSchema);
