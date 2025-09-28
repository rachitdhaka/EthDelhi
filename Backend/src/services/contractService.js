import { ethers } from 'ethers';
import dotenv from 'dotenv';
dotenv.config();

// Contract addresses on Sepolia testnet
const CONTRACT_ADDRESSES = {
  IDENTITY_REGISTRY: '0xDAcE33E005a7506857Ebd9506fa96302d6eAdDe3',
  COMPLIANCE_MANAGER: '0xBBE5cc1D17Af64aceC326447dE0AD211A136832A',
  RWA_TOKEN: '0x0d397Ff2B28ab07eAe86cd85c4a422fEAE340442',
  ZK_VERIFIER: '0x3E3BBAE354625d5CE63Ca8Cf098Eb6c82DbA5452',
  RWA_DOCUMENT_VAULT: '0x7babE1412Ea83B8562102Eb2A4773ee4daf7cfe6',
  MOCK_ASI_ORACLE: '0x3EE222EA493b5c29689F0ca751E33be88e59CB36',
  AI_COLLATERAL_AGENT: '0xcA39901735315B253c32F6614d706a5918bd1e35',
  RWA_LENDING_PROTOCOL: '0x4B400B7FB7a3B850bBCBf1c0e038bbb076F6F865',
};

// Contract ABIs
const IDENTITY_REGISTRY_ABI = [
  "function verifyUser(address user) external",
  "function isVerified(address user) external view returns (bool)",
  "event UserVerified(address indexed user)"
];

const RWA_DOCUMENT_VAULT_ABI = [
  "function storeDocument(string calldata cid, bytes32 docHash) external",
  "function userDocumentCID(address user) external view returns (string)",
  "function userDocumentHash(address user) external view returns (bytes32)",
  "event DocumentStored(address indexed user, string cid, bytes32 docHash)"
];

const AI_COLLATERAL_AGENT_ABI = [
  "function registerCollateral(address user, string calldata asset, uint256 appraisalValue, bytes calldata zkProof) external",
  "function calculateLTV(address user) external view returns (uint256)",
  "function getLivePrice(string memory asset, bool isPyth) public view returns (uint256)",
  "function userCollateral(address user) external view returns (string asset, uint256 appraisalValue, bool active, bool isPythAsset)"
];

const RWA_TOKEN_ABI = [
  "function mint(address to, uint256 amount) external",
  "function balanceOf(address account) external view returns (uint256)",
  "function transfer(address to, uint256 amount) external returns (bool)",
  "function name() external view returns (string)",
  "function symbol() external view returns (string)",
  "function totalSupply() external view returns (uint256)"
];

const RWA_LENDING_PROTOCOL_ABI = [
  "function borrow(uint256 amount) external",
  "function borrowedAmounts(address user) external view returns (uint256)"
];

const MOCK_ASI_ORACLE_ABI = [
  "function setPrice(string calldata assetSymbol, uint256 price) external",
  "function getPrice(string calldata assetSymbol) external view returns (uint256)"
];

// Initialize provider and wallet
const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL || 'https://rpc.sepolia.org');
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY || '', provider);

// Contract instances
const identityRegistry = new ethers.Contract(CONTRACT_ADDRESSES.IDENTITY_REGISTRY, IDENTITY_REGISTRY_ABI, wallet);
const documentVault = new ethers.Contract(CONTRACT_ADDRESSES.RWA_DOCUMENT_VAULT, RWA_DOCUMENT_VAULT_ABI, wallet);
const aiCollateralAgent = new ethers.Contract(CONTRACT_ADDRESSES.AI_COLLATERAL_AGENT, AI_COLLATERAL_AGENT_ABI, wallet);
const rwaToken = new ethers.Contract(CONTRACT_ADDRESSES.RWA_TOKEN, RWA_TOKEN_ABI, wallet);
const lendingProtocol = new ethers.Contract(CONTRACT_ADDRESSES.RWA_LENDING_PROTOCOL, RWA_LENDING_PROTOCOL_ABI, wallet);
const mockASIOracle = new ethers.Contract(CONTRACT_ADDRESSES.MOCK_ASI_ORACLE, MOCK_ASI_ORACLE_ABI, wallet);

export const contractService = {
  // Identity Registry functions
  async verifyUser(userAddress) {
    try {
      const tx = await identityRegistry.verifyUser(userAddress);
      await tx.wait();
      return { success: true, txHash: tx.hash };
    } catch (error) {
      console.error('Error verifying user:', error);
      throw new Error('Failed to verify user');
    }
  },

  async isUserVerified(userAddress) {
    try {
      return await identityRegistry.isVerified(userAddress);
    } catch (error) {
      console.error('Error checking user verification:', error);
      return false;
    }
  },

  // Document Vault functions
  async storeDocument(userAddress, cid, docHash) {
    try {
      const tx = await documentVault.storeDocument(cid, docHash);
      await tx.wait();
      return { success: true, txHash: tx.hash };
    } catch (error) {
      console.error('Error storing document:', error);
      throw new Error('Failed to store document');
    }
  },

  async getUserDocument(userAddress) {
    try {
      const [cid, hash] = await Promise.all([
        documentVault.userDocumentCID(userAddress),
        documentVault.userDocumentHash(userAddress)
      ]);
      return { cid, hash };
    } catch (error) {
      console.error('Error getting user document:', error);
      return { cid: '', hash: '0x0' };
    }
  },

  // AI Collateral Agent functions
  async registerCollateral(userAddress, asset, appraisalValue, zkProof) {
    try {
      const tx = await aiCollateralAgent.registerCollateral(userAddress, asset, appraisalValue, zkProof);
      await tx.wait();
      return { success: true, txHash: tx.hash };
    } catch (error) {
      console.error('Error registering collateral:', error);
      throw new Error('Failed to register collateral');
    }
  },

  async getUserCollateral(userAddress) {
    try {
      const collateral = await aiCollateralAgent.userCollateral(userAddress);
      return {
        asset: collateral[0],
        appraisalValue: ethers.formatEther(collateral[1]),
        active: collateral[2],
        isPythAsset: collateral[3]
      };
    } catch (error) {
      console.error('Error getting user collateral:', error);
      return null;
    }
  },

  async calculateLTV(userAddress) {
    try {
      const ltv = await aiCollateralAgent.calculateLTV(userAddress);
      return parseFloat(ethers.formatEther(ltv));
    } catch (error) {
      console.error('Error calculating LTV:', error);
      return 0;
    }
  },

  async getLivePrice(asset, isPyth) {
    try {
      const price = await aiCollateralAgent.getLivePrice(asset, isPyth);
      return ethers.formatEther(price);
    } catch (error) {
      console.error('Error getting live price:', error);
      return '0';
    }
  },

  // RWA Token functions
  async mintToken(toAddress, amount) {
    try {
      const tx = await rwaToken.mint(toAddress, ethers.parseEther(amount.toString()));
      await tx.wait();
      return { success: true, txHash: tx.hash };
    } catch (error) {
      console.error('Error minting token:', error);
      throw new Error('Failed to mint token');
    }
  },

  async getTokenBalance(userAddress) {
    try {
      const balance = await rwaToken.balanceOf(userAddress);
      return ethers.formatEther(balance);
    } catch (error) {
      console.error('Error getting token balance:', error);
      return '0';
    }
  },

  async getTotalSupply() {
    try {
      const supply = await rwaToken.totalSupply();
      return ethers.formatEther(supply);
    } catch (error) {
      console.error('Error getting total supply:', error);
      return '0';
    }
  },

  // Lending Protocol functions
  async borrow(userAddress, amount) {
    try {
      const tx = await lendingProtocol.borrow(ethers.parseEther(amount.toString()));
      await tx.wait();
      return { success: true, txHash: tx.hash };
    } catch (error) {
      console.error('Error borrowing:', error);
      throw new Error('Failed to borrow funds');
    }
  },

  async getBorrowedAmount(userAddress) {
    try {
      const amount = await lendingProtocol.borrowedAmounts(userAddress);
      return ethers.formatEther(amount);
    } catch (error) {
      console.error('Error getting borrowed amount:', error);
      return '0';
    }
  },

  // Mock ASI Oracle functions
  async setASIPrice(assetSymbol, price) {
    try {
      const tx = await mockASIOracle.setPrice(assetSymbol, ethers.parseEther(price.toString()));
      await tx.wait();
      return { success: true, txHash: tx.hash };
    } catch (error) {
      console.error('Error setting ASI price:', error);
      throw new Error('Failed to set ASI price');
    }
  },

  async getASIPrice(assetSymbol) {
    try {
      const price = await mockASIOracle.getPrice(assetSymbol);
      return ethers.formatEther(price);
    } catch (error) {
      console.error('Error getting ASI price:', error);
      return '0';
    }
  }
};


