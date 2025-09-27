export const validateUpload = (req, res, next) => {
   if (!req.body.assetType) {
      return res.status(400).json({ message: "assetId and assetType required" });
   }
   next();
};
