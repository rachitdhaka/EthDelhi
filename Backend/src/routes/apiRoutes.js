import express from "express";
import { requestNonce, verifySignature } from "../controllers/authController.js";
import { uploadDocuments, getValuation } from "../controllers/rwaController.js";
import { mintToken, getUserTokens } from "../controllers/tokenController.js";
import { borrowFunds, repayFunds, getMyLoans } from "../controllers/borrowController.js";
import { validateUpload } from "../middleware/validateUpload.js";
import { authenticateJWT } from "../middleware/authenticateJWT.js";

const router = express.Router();

// Auth
router.post("/auth/request-nonce", requestNonce);
router.post("/auth/verify-signature", verifySignature);

// RWA
router.post("/rwa/upload", authenticateJWT, validateUpload, uploadDocuments);
router.get("/rwa/valuation/:assetId/:assetType", authenticateJWT, getValuation);

// Tokens
router.post("/token/mint", authenticateJWT, mintToken);
router.get("/token/my-tokens", authenticateJWT, getUserTokens);

// Borrow / Lend
router.post("/borrow/create", authenticateJWT, borrowFunds);
router.post("/borrow/repay/:loanId", authenticateJWT, repayFunds);
router.get("/borrow/my-loans", authenticateJWT, getMyLoans);

export default router;
