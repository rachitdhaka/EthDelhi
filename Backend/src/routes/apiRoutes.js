import express from "express";
import { requestNonce, verifySignature } from "../controllers/authController.js";
import { 
  uploadDocuments, 
  getValuation, 
  getDocuments, 
  verifyUser, 
  isUserVerified, 
  mintToken as mintRwaToken, 
  getTokenBalance, 
  registerCollateral, 
  getUserCollateral, 
  calculateLTV, 
  borrow, 
  getBorrowedAmount, 
  setASIPrice, 
  getASIPrice,
  updateAllPrices,
  updateAssetPrice,
  getAllPrices,
  getPriceFeedStatus,
  getFilecoinPrice,
  getFilecoinNetworkInfo,
  getStorageProviders,
  createStorageService,
  getPriceHistory,
  getRWAAssetPrice,
  storeRWADocuments,
  getStorageDealStatus,
  getCalibrationNetworkInfo
} from "../controllers/rwaController.js";
import { mintToken, getUserTokens } from "../controllers/tokenController.js";
import { borrowFunds, repayFunds, getMyLoans } from "../controllers/borrowController.js";
import { validateUpload } from "../middleware/validateUpload.js";
import { authenticateJWT } from "../middleware/authenticateJWT.js";
import multer from "multer";

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF, JPG, PNG allowed.'), false);
    }
  }
});

const router = express.Router();

// Auth
router.post("/auth/request-nonce", requestNonce);
router.post("/auth/verify-signature", verifySignature);

// RWA
router.post("/rwa/upload", authenticateJWT, upload.array('documents', 10), uploadDocuments);
router.get("/rwa/get", authenticateJWT, getDocuments);
router.get("/rwa/valuation/:assetId/:assetType", authenticateJWT, getValuation);

// Contract interactions
router.post("/contract/verify-user", verifyUser);
router.get("/contract/is-verified/:userAddress", isUserVerified);
router.post("/contract/mint-token", mintRwaToken);
router.get("/contract/token-balance/:userAddress", getTokenBalance);
router.post("/contract/register-collateral", registerCollateral);
router.get("/contract/collateral/:userAddress", getUserCollateral);
router.get("/contract/ltv/:userAddress", calculateLTV);
router.post("/contract/borrow", borrow);
router.get("/contract/borrowed/:userAddress", getBorrowedAmount);
router.post("/contract/set-asi-price", setASIPrice);
router.get("/contract/asi-price/:assetSymbol", getASIPrice);

// Price feed endpoints
router.post("/price-feed/update-all", updateAllPrices);
router.post("/price-feed/update/:assetSymbol", updateAssetPrice);
router.get("/price-feed/all-prices", getAllPrices);
router.get("/price-feed/status", getPriceFeedStatus);

// Filecoin Synapse SDK endpoints
router.get("/filecoin/price", getFilecoinPrice);
router.get("/filecoin/network", getFilecoinNetworkInfo);
router.get("/filecoin/providers", getStorageProviders);
router.post("/filecoin/storage-service", createStorageService);
router.get("/filecoin/price-history", getPriceHistory);
router.get("/filecoin/rwa-price", getRWAAssetPrice);

// Calibration Testnet specific endpoints
router.get("/calibration/network", getCalibrationNetworkInfo);
router.post("/calibration/store-documents", storeRWADocuments);
router.get("/calibration/deal-status/:dealId", getStorageDealStatus);

// Tokens
router.post("/token/mint", authenticateJWT, mintToken);
router.get("/token/my-tokens", authenticateJWT, getUserTokens);

// Borrow / Lend
router.post("/borrow/create", authenticateJWT, borrowFunds);
router.post("/borrow/repay/:loanId", authenticateJWT, repayFunds);
router.get("/borrow/my-loans", authenticateJWT, getMyLoans);

export default router;
