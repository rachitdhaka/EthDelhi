import RWAToken from "../models/RWAToken.js";
import { randomBytes } from "crypto";

export const mintRwaToken = async (walletAddress, assetData, valuation) => {
   const tokenAddress = "0x" + randomBytes(20).toString("hex");

   const token = new RWAToken({
      walletAddress,
      assetType: assetData.assetType,
      assetId: assetData.assetId,
      valuation,
      tokenAddress,
      metadata: assetData
   });

   await token.save();
   return token;
};

export const getTokensForUser = async (walletAddress) => {
   return await RWAToken.find({ walletAddress });
};
