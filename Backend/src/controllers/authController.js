import jwt from "jsonwebtoken";
import { ethers } from "ethers";
import User from "../models/User.js";

// Step 1: Request nonce
export const requestNonce = async (req, res) => {
   const { walletAddress } = req.body;
   if (!walletAddress) return res.status(400).json({ message: "Wallet address required" });

   let user = await User.findOne({ walletAddress });
   if (!user) {
      user = new User({ walletAddress, nonce: Math.floor(Math.random() * 1000000).toString() });
      await user.save();
   }

   res.json({ nonce: user.nonce });
};

// Step 2: Verify signature
// export const verifySignature = async (req, res) => {
//    const { walletAddress, signature } = req.body;

//    try {
//       const user = await User.findOne({ walletAddress });
//       if (!user) return res.status(400).json({ message: "User not found" });

//       const message = `Login nonce: ${user.nonce}`;
//       const signerAddr = ethers.verifyMessage(message, signature);

//       if (signerAddr.toLowerCase() !== walletAddress.toLowerCase()) {
//          return res.status(401).json({ message: "Signature verification failed" });
//       }

//       // Rotate nonce
//       user.nonce = Math.floor(Math.random() * 1000000).toString();
//       await user.save();

//       // Issue JWT
//       const token = jwt.sign(
//          { walletAddress: user.walletAddress, id: user._id },
//          process.env.JWT_SECRET,
//          { expiresIn: process.env.JWT_EXPIRES_IN }
//       );

//       res.json({ token });
//    } catch (err) {
//       console.error("Signature verification error:", err);
//       res.status(500).json({ message: "Server error" });
//    }
// };

export const verifySignature = async (req, res) => {
   const { walletAddress, signature } = req.body;

   // TEMP: just accept any signature
   const token = jwt.sign(
      { walletAddress, id: "dummyUserId" },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
   );

   res.json({ token });
};

