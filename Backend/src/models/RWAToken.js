import mongoose from "mongoose";

const rwaTokenSchema = new mongoose.Schema({
   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
   assetType: { type: String, required: true },
   assetId: { type: String, required: true },
   valuation: { type: Number, required: true },
   tokenAddress: { type: String, unique: true, required: true },
   metadata: { type: Object },
}, { timestamps: true });

export default mongoose.model("RWAToken", rwaTokenSchema);
