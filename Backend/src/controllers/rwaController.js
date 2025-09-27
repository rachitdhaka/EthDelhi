import { fetchRWAValuation } from "../services/asiService.js";

export const uploadDocuments = async (req, res) => {
   try {
      // Just simulate saving metadata
      const { assetId, assetType } = req.body;
      res.json({ message: "Document uploaded successfully", assetId, assetType });
   } catch (err) {
      console.error("Upload error:", err);
      res.status(500).json({ error: "Upload failed" });
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
