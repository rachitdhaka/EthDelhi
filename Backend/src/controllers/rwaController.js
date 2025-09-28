import { fetchRWAValuation } from "../services/asiService.js";
import { contractService } from "../services/contractService.js";
import { priceFeedService } from "../services/priceFeedService.js";
import { ipfsService } from "../services/ipfsService.js";
import { workingIpfsService } from "../services/workingIpfsService.js";
import { filecoinService } from "../services/filecoinService.js";
import RWAToken from "../models/RWAToken.js";
import { v4 as uuidv4 } from 'uuid';
import multer from 'multer';
import crypto from 'crypto';


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

export const uploadDocuments = async (req, res) => {
   try {
      const { assetId, assetType, valuation = 0, metadata = {}, userAddress } = req.body;
      const { userId } = req; // Assuming userId comes from JWT middleware

      // Upload files to IPFS using working service
      let ipfsResults = [];
      let documentHash = '';
      let documentCID = '';

      if (req.files && req.files.length > 0) {
         console.log(`📤 Uploading ${req.files.length} files to IPFS...`);
         
         // Upload files to IPFS using working service
         ipfsResults = await workingIpfsService.uploadMultipleFiles(req.files);
         
         // Create a combined document hash
         const combinedContent = req.files.map(file => file.buffer).join('');
         documentHash = crypto.createHash('sha256').update(combinedContent).digest('hex');
         
         // Use the first file's CID as the main document CID
         documentCID = ipfsResults[0]?.cid || '';
         
         console.log(`✅ IPFS upload complete. CID: ${documentCID}, Hash: ${documentHash}`);
         console.log(`🌐 Gateway URL: ${ipfsResults[0]?.gateway || 'N/A'}`);
      }

      // Store document on-chain if userAddress is provided
      if (userAddress && documentCID && documentHash) {
         try {
            await contractService.storeDocument(userAddress, documentCID, `0x${documentHash}`);
            console.log(`✅ Document stored on-chain for user: ${userAddress}`);
         } catch (contractError) {
            console.error("Contract error:", contractError);
            // Continue with database storage even if contract fails
         }
      }

      // Generate a unique token address
      const tokenAddress = `0x${uuidv4().replace(/-/g, '')}`;

      // Create new RWAToken document
      const rwaToken = new RWAToken({
         userId,
         assetType,
         assetId,
         valuation,
         tokenAddress,
         metadata: {
            ...metadata,
            userAddress,
            documentCID,
            documentHash: `0x${documentHash}`,
            ipfsResults,
            uploadTimestamp: new Date().toISOString()
         }
      });

      // Save to MongoDB
      const savedToken = await rwaToken.save();

      // Store on Filecoin Calibration Testnet for warm storage
      let filecoinDeal = null;
      if (documentCID && documentHash && req.files && req.files.length > 0) {
         try {
            console.log(`📤 Storing ${req.files.length} files on Filecoin Calibration Testnet...`);
            filecoinDeal = await filecoinService.storeRWADocuments(req.files, {
               cid: documentCID,
               hash: documentHash,
               type: 'rwa-document',
               fileName: req.files[0].originalname,
               fileSize: req.files[0].size,
               uploadTime: new Date().toISOString()
            });
            console.log('✅ Filecoin warm storage completed:', filecoinDeal);
         } catch (filecoinError) {
            console.warn('⚠️ Filecoin storage failed:', filecoinError.message);
         }
      }

      res.status(201).json({
         success: true,
         message: "Document uploaded and RWA token created successfully",
         token: savedToken,
         ipfs: {
            cid: documentCID,
            hash: documentHash,
            files: ipfsResults,
            gateway: ipfsResults[0]?.gateway || `https://ipfs.io/ipfs/${documentCID}`,
            filecoin: filecoinDeal,
            timestamp: new Date().toISOString(),
            // Additional URLs for better accessibility
            urls: {
               ipfs: `https://ipfs.io/ipfs/${documentCID}`,
               pinata: `https://gateway.pinata.cloud/ipfs/${documentCID}`,
               filecoin: filecoinDeal?.explorerUrl || null,
               filecoinIpfs: filecoinDeal?.ipfsUrl || null
            }
         }
      });
   } catch (err) {
      console.error("Upload error:", err);
      res.status(500).json({ error: "Upload failed", details: err.message });
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

// New contract interaction endpoints
export const verifyUser = async (req, res) => {
   try {
      const { userAddress } = req.body;
      const result = await contractService.verifyUser(userAddress);
      res.json({ success: true, ...result });
   } catch (err) {
      console.error("Verification error:", err);
      res.status(500).json({ error: "Failed to verify user" });
   }
};

export const isUserVerified = async (req, res) => {
   try {
      const { userAddress } = req.params;
      const isVerified = await contractService.isUserVerified(userAddress);
      res.json({ userAddress, isVerified });
   } catch (err) {
      console.error("Check verification error:", err);
      res.status(500).json({ error: "Failed to check verification status" });
   }
};

export const mintToken = async (req, res) => {
   try {
      const { toAddress, amount } = req.body;
      const result = await contractService.mintToken(toAddress, amount);
      res.json({ success: true, ...result });
   } catch (err) {
      console.error("Mint token error:", err);
      res.status(500).json({ error: "Failed to mint token" });
   }
};

export const getTokenBalance = async (req, res) => {
   try {
      const { userAddress } = req.params;
      const balance = await contractService.getTokenBalance(userAddress);
      res.json({ userAddress, balance });
   } catch (err) {
      console.error("Get balance error:", err);
      res.status(500).json({ error: "Failed to get token balance" });
   }
};

export const registerCollateral = async (req, res) => {
   try {
      const { userAddress, asset, appraisalValue, zkProof } = req.body;
      const result = await contractService.registerCollateral(userAddress, asset, appraisalValue, zkProof);
      res.json({ success: true, ...result });
   } catch (err) {
      console.error("Register collateral error:", err);
      res.status(500).json({ error: "Failed to register collateral" });
   }
};

export const getUserCollateral = async (req, res) => {
   try {
      const { userAddress } = req.params;
      const collateral = await contractService.getUserCollateral(userAddress);
      res.json({ userAddress, collateral });
   } catch (err) {
      console.error("Get collateral error:", err);
      res.status(500).json({ error: "Failed to get collateral" });
   }
};

export const calculateLTV = async (req, res) => {
   try {
      const { userAddress } = req.params;
      const ltv = await contractService.calculateLTV(userAddress);
      res.json({ userAddress, ltv });
   } catch (err) {
      console.error("Calculate LTV error:", err);
      res.status(500).json({ error: "Failed to calculate LTV" });
   }
};

export const borrow = async (req, res) => {
   try {
      const { userAddress, amount } = req.body;
      const result = await contractService.borrow(userAddress, amount);
      res.json({ success: true, ...result });
   } catch (err) {
      console.error("Borrow error:", err);
      res.status(500).json({ error: "Failed to borrow funds" });
   }
};

export const getBorrowedAmount = async (req, res) => {
   try {
      const { userAddress } = req.params;
      const amount = await contractService.getBorrowedAmount(userAddress);
      res.json({ userAddress, amount });
   } catch (err) {
      console.error("Get borrowed amount error:", err);
      res.status(500).json({ error: "Failed to get borrowed amount" });
   }
};

export const setASIPrice = async (req, res) => {
   try {
      const { assetSymbol, price } = req.body;
      const result = await contractService.setASIPrice(assetSymbol, price);
      res.json({ success: true, ...result });
   } catch (err) {
      console.error("Set ASI price error:", err);
      res.status(500).json({ error: "Failed to set ASI price" });
   }
};

export const getASIPrice = async (req, res) => {
   try {
      const { assetSymbol } = req.params;
      const price = await contractService.getASIPrice(assetSymbol);
      res.json({ assetSymbol, price });
   } catch (err) {
      console.error("Get ASI price error:", err);
      res.status(500).json({ error: "Failed to get ASI price" });
   }
};

// Price feed service endpoints
export const updateAllPrices = async (req, res) => {
   try {
      await priceFeedService.updateAllPrices();
      res.json({ success: true, message: "Price update initiated" });
   } catch (err) {
      console.error("Update all prices error:", err);
      res.status(500).json({ error: "Failed to update prices" });
   }
};

export const updateAssetPrice = async (req, res) => {
   try {
      const { assetSymbol } = req.params;
      const result = await priceFeedService.updateSpecificAsset(assetSymbol);
      res.json({ success: true, result });
   } catch (err) {
      console.error("Update asset price error:", err);
      res.status(500).json({ error: "Failed to update asset price" });
   }
};

export const getAllPrices = async (req, res) => {
   try {
      const prices = await priceFeedService.getAllPrices();
      res.json({ success: true, prices });
   } catch (err) {
      console.error("Get all prices error:", err);
      res.status(500).json({ error: "Failed to get all prices" });
   }
};

export const getPriceFeedStatus = async (req, res) => {
   try {
      const status = priceFeedService.getStatus();
      res.json({ success: true, status });
   } catch (err) {
      console.error("Get price feed status error:", err);
      res.status(500).json({ error: "Failed to get price feed status" });
   }
};

// Filecoin Synapse SDK endpoints
export const getFilecoinPrice = async (req, res) => {
   try {
      const priceData = await filecoinService.getFilecoinPrice();
      res.json({ success: true, data: priceData });
   } catch (error) {
      console.error("Error getting Filecoin price:", error);
      res.status(500).json({ error: "Failed to get Filecoin price" });
   }
};

export const getFilecoinNetworkInfo = async (req, res) => {
   try {
      const networkInfo = await filecoinService.getNetworkInfo();
      res.json({ success: true, data: networkInfo });
   } catch (error) {
      console.error("Error getting Filecoin network info:", error);
      res.status(500).json({ error: "Failed to get network info" });
   }
};

export const getStorageProviders = async (req, res) => {
   try {
      const providers = await filecoinService.getStorageProviders();
      res.json({ success: true, data: providers });
   } catch (error) {
      console.error("Error getting storage providers:", error);
      res.status(500).json({ error: "Failed to get storage providers" });
   }
};

export const createStorageService = async (req, res) => {
   try {
      const { name, description, price, duration, capacity } = req.body;
      
      const serviceData = {
         name,
         description,
         price: parseFloat(price),
         duration: parseInt(duration),
         capacity: parseInt(capacity)
      };
      
      const service = await filecoinService.createStorageService(serviceData);
      res.json({ success: true, data: service });
   } catch (error) {
      console.error("Error creating storage service:", error);
      res.status(500).json({ error: "Failed to create storage service" });
   }
};

export const getPriceHistory = async (req, res) => {
   try {
      const { assetSymbol, days = 30 } = req.query;
      
      if (!assetSymbol) {
         return res.status(400).json({ error: "Asset symbol is required" });
      }
      
      const history = await filecoinService.getPriceHistory(assetSymbol, parseInt(days));
      res.json({ success: true, data: history });
   } catch (error) {
      console.error("Error getting price history:", error);
      res.status(500).json({ error: "Failed to get price history" });
   }
};

export const getRWAAssetPrice = async (req, res) => {
   try {
      const { assetSymbol, isPyth = false } = req.query;
      
      if (!assetSymbol) {
         return res.status(400).json({ error: "Asset symbol is required" });
      }
      
      const priceData = await filecoinService.getRWAAssetPrice(assetSymbol, isPyth === 'true');
      res.json({ success: true, data: priceData });
   } catch (error) {
      console.error("Error getting RWA asset price:", error);
      res.status(500).json({ error: "Failed to get RWA asset price" });
   }
};

// Calibration Testnet specific endpoints
export const storeRWADocuments = async (req, res) => {
   try {
      const { documents, metadata } = req.body;
      
      if (!documents || !Array.isArray(documents)) {
         return res.status(400).json({ error: "Documents array is required" });
      }
      
      const result = await filecoinService.storeRWADocuments(documents, metadata);
      res.json({ success: true, data: result });
   } catch (error) {
      console.error("Error storing RWA documents on Calibration:", error);
      res.status(500).json({ error: "Failed to store RWA documents" });
   }
};

export const getStorageDealStatus = async (req, res) => {
   try {
      const { dealId } = req.params;
      
      if (!dealId) {
         return res.status(400).json({ error: "Deal ID is required" });
      }
      
      const status = await filecoinService.getStorageDealStatus(dealId);
      res.json({ success: true, data: status });
   } catch (error) {
      console.error("Error getting storage deal status:", error);
      res.status(500).json({ error: "Failed to get storage deal status" });
   }
};

export const getCalibrationNetworkInfo = async (req, res) => {
   try {
      const networkInfo = await filecoinService.getNetworkInfo();
      const calibrationInfo = {
         ...networkInfo,
         network: 'calibration',
         chainId: 314159,
         rpcUrl: 'https://api.calibration.node.glif.io/rpc/v1',
         wsUrl: 'wss://wss.calibration.node.glif.io/apigw/lotus/rpc/v1',
         sectorSize: '32GiB',
         minimumPower: '32 GiB',
         epochDuration: '30 seconds',
         faucets: [
            'https://faucet.calibnet.chainsafe-fil.io',
            'https://beryx.zondax.ch/faucet/',
            'https://forest-explorer.chainsafe.dev/faucet/calibnet'
         ]
      };
      
      res.json({ success: true, data: calibrationInfo });
   } catch (error) {
      console.error("Error getting Calibration network info:", error);
      res.status(500).json({ error: "Failed to get network info" });
   }
};

// Get active storage deals for a CID
export const getActiveStorageDeals = async (req, res) => {
   try {
      const { cid } = req.params;
      if (!cid) {
         return res.status(400).json({ error: 'CID parameter is required' });
      }

      const deals = await filecoinService.getActiveStorageDeals(cid);
      res.json({
         success: true,
         deals: deals,
         count: deals.length,
         cid: cid
      });
   } catch (error) {
      console.error('Error getting active storage deals:', error);
      res.status(500).json({ error: 'Failed to get storage deals', details: error.message });
   }
};
