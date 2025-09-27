import { mintRwaToken, getTokensForUser } from "../services/tokenService.js";

export const mintToken = async (req, res) => {
   try {
      const { assetId, assetType, valuation } = req.body;
      const walletAddress = req.user.walletAddress;

      const token = await mintRwaToken(walletAddress, { assetId, assetType }, valuation);
      res.json(token);
   } catch (err) {
      console.error("Token mint error:", err);
      res.status(500).json({ error: "Token mint failed" });
   }
};

export const getUserTokens = async (req, res) => {
   try {
      const walletAddress = req.user.walletAddress;
      const tokens = await getTokensForUser(walletAddress);
      res.json(tokens);
   } catch (err) {
      console.error("Token fetch error:", err);
      res.status(500).json({ error: "Failed to fetch tokens" });
   }
};
