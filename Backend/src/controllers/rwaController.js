import { fetchRWAValuation } from "../services/asiService.js";
import RWAToken from "../models/RWAToken.js";
import { v4 as uuidv4 } from 'uuid';


export const uploadDocuments = async (req, res) => {
   try {
      const { assetId, assetType, valuation = 0, metadata = {} } = req.body;
      const { userId } = req; // Assuming userId comes from JWT middleware

      // Generate a unique token address
      const tokenAddress = `0x${uuidv4().replace(/-/g, '')}`;

      // Create new RWAToken document
      const rwaToken = new RWAToken({
         userId,
         assetType,
         assetId,
         valuation,
         tokenAddress,
         metadata
      });

      // Save to MongoDB
      const savedToken = await rwaToken.save();

      res.status(201).json({
         message: "Document uploaded and RWA token created successfully",
         token: savedToken
      });
   } catch (err) {
      console.error("Upload error:", err);
      res.status(500).json({ error: "Upload failed" });
   }
};

export const getDocuments = async (req, res) => {
   try {
      const { userId } = req;

      // Fetch RWA tokens from MongoDB for the specific user
      const rwaTokens = await RWAToken.find({ userId }).populate('userId', 'name email');

      // Transform the data to match the expected document format
      const documents = rwaTokens.map(token => ({
         id: token._id,
         assetId: token.assetId,
         assetType: token.assetType,
         valuation: token.valuation,
         tokenAddress: token.tokenAddress,
         metadata: token.metadata,
         createdAt: token.createdAt,
         updatedAt: token.updatedAt,
         owner: token.userId
      }));

      res.json({
         documents,
         total: documents.length
      });
   } catch (err) {
      console.error("Fetch documents error:", err);
      res.status(500).json({ error: "Failed to fetch documents" });
   }
};

export const getValuation = async (req, res) => {
   try {
      const { assetId, assetType } = req.params;
      const valuation = await fetchRWAValuation(assetId, assetType);
      res.json({ assetId, assetType, valuation });
   } catch (err) {
      console.error("Valuation error:", err);
      res.status(500).json({ error: "Failed to fetch valuation" });
   }
};
