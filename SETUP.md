# Quick Setup Guide

## 🚀 Getting Started

### 1. Install Dependencies

**Backend:**
```bash
cd Backend
npm install
```

**Frontend:**
```bash
cd Frontend
npm install
```

### 2. Environment Setup

**Backend (.env):**
```env
MONGO_URI=mongodb://localhost:27017/rwa-platform
SEPOLIA_RPC_URL=https://rpc.sepolia.org
PRIVATE_KEY=0x...your_private_key_here
ASI_ONE_API_KEY=your_asi_alliance_api_key_here
PORT=3000
```

**Frontend (.env.local):**
```env
VITE_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id_here
VITE_SEPOLIA_RPC_URL=https://rpc.sepolia.org
```

### 3. Start the Services

**Terminal 1 - Backend:**
```bash
cd Backend
npm start
```

**Terminal 2 - Frontend:**
```bash
cd Frontend
npm run dev
```

### 4. Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000

## 🔧 Fixed Issues

✅ **Frontend LTV Conflict**: Renamed `ltv` to `contractLTV` to avoid naming conflict
✅ **Backend Duplicate Import**: Renamed `mintToken` to `mintRwaToken` in API routes
✅ **TypeScript Errors**: Added proper type definitions for user assets
✅ **Missing Dependencies**: Added `node-cron` for price feed automation

## 🎯 What's Working Now

1. **Smart Contract Integration**: All contracts are properly connected
2. **Asset Management**: Both existing and new asset tokenization
3. **Price Feeds**: Automated ASI price updates every 5 minutes
4. **Lending Protocol**: Borrow against tokenized assets
5. **Identity Verification**: On-chain KYC through Identity Registry

## 🚨 Important Notes

- Make sure you're on **Sepolia testnet**
- Get some Sepolia ETH for gas fees
- The price feed service starts automatically with the backend
- All contract addresses are configured for Sepolia testnet

## 🧪 Testing the Integration

1. **Connect Wallet**: Use RainbowKit to connect to Sepolia
2. **Tokenize Asset**: Go to `/register-asset` to tokenize a new asset
3. **Borrow Against Assets**: Go to `/borrow` to borrow against your assets
4. **Check Price Feeds**: Monitor the automated price updates in the backend logs

## 📊 Contract Addresses (Sepolia)

- IdentityRegistry: `0xDAcE33E005a7506857Ebd9506fa96302d6eAdDe3`
- RWADocumentVault: `0x7babE1412Ea83B8562102Eb2A4773ee4daf7cfe6`
- AICollateralAgent: `0xcA39901735315B253c32F6614d706a5918bd1e35`
- RWAToken: `0x0d397Ff2B28ab07eAe86cd85c4a422fEAE340442`
- RWALendingProtocol: `0x4B400B7FB7a3B850bBCBf1c0e038bbb076F6F865`
- MockASIOracle: `0x3EE222EA493b5c29689F0ca751E33be88e59CB36`

Everything should now work without errors! 🎉
