# RWA Platform - Smart Contract Integration

A comprehensive Real World Asset (RWA) tokenization platform with smart contract integration, AI-powered valuation, and DeFi lending capabilities.

## 🏗️ Architecture Overview

### Frontend (React + TypeScript)
- **Web3 Integration**: Wagmi + Viem for Ethereum interactions
- **UI Framework**: React with TailwindCSS
- **Wallet Support**: RainbowKit for wallet connection
- **State Management**: React hooks for contract interactions

### Backend (Node.js + Express)
- **Database**: MongoDB for asset metadata storage
- **Web3 Integration**: Ethers.js for contract interactions
- **AI Services**: ASI Alliance integration for real-time asset valuation
- **Price Feeds**: Automated price updates via cron jobs

### Smart Contracts (Solidity)
- **Identity Registry**: User verification and KYC
- **Document Vault**: IPFS document storage and verification
- **AI Collateral Agent**: Asset registration and LTV calculation
- **RWA Token**: ERC-20 token for tokenized assets
- **Lending Protocol**: Borrowing against collateral
- **Price Oracles**: Pyth Network + ASI Alliance integration

## 📋 Contract Addresses (Sepolia Testnet)

| Contract | Address | Purpose |
|----------|---------|---------|
| IdentityRegistry | `0xDAcE33E005a7506857Ebd9506fa96302d6eAdDe3` | User verification |
| ComplianceManager | `0xBBE5cc1D17Af64aceC326447dE0AD211A136832A` | Transfer compliance |
| RWAToken | `0x0d397Ff2B28ab07eAe86cd85c4a422fEAE340442` | Tokenized assets |
| ZKVerifier | `0x3E3BBAE354625d5CE63Ca8Cf098Eb6c82DbA5452` | Zero-knowledge proofs |
| RWADocumentVault | `0x7babE1412Ea83B8562102Eb2A4773ee4daf7cfe6` | Document storage |
| MockASIOracle | `0x3EE222EA493b5c29689F0ca751E33be88e59CB36` | ASI price feeds |
| AICollateralAgent | `0xcA39901735315B253c32F6614d706a5918bd1e35` | Collateral management |
| RWALendingProtocol | `0x4B400B7FB7a3B850bBCBf1c0e038bbb076F6F865` | Lending operations |

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB
- Wallet with Sepolia ETH
- WalletConnect Project ID

### Frontend Setup

```bash
cd Frontend
npm install
```

Create `.env.local`:
```env
VITE_WALLETCONNECT_PROJECT_ID=your_project_id_here
VITE_SEPOLIA_RPC_URL=https://rpc.sepolia.org
```

```bash
npm run dev
```

### Backend Setup

```bash
cd Backend
npm install
```

Create `.env`:
```env
MONGO_URI=mongodb://localhost:27017/rwa-platform
SEPOLIA_RPC_URL=https://rpc.sepolia.org
PRIVATE_KEY=your_private_key_here
ASI_ONE_API_KEY=your_asi_api_key_here
PORT=3000
```

```bash
npm start
```

## 🔧 Key Features

### 1. Asset Tokenization Flow
1. **Asset Selection**: Choose from predefined assets or upload new ones
2. **Document Upload**: Store documents on IPFS and hash on-chain
3. **Identity Verification**: KYC through Identity Registry contract
4. **Token Minting**: Create RWA tokens representing asset ownership

### 2. Price Feed Integration
- **Pyth Network**: Real-time prices for traditional assets (AAPL, TSLA, NVDA, XAU, XAG, BRENT)
- **ASI Alliance**: AI-powered valuation for custom RWAs
- **Automated Updates**: Cron jobs update prices every 5 minutes

### 3. Lending Protocol
- **Collateral Registration**: Register assets as collateral
- **LTV Calculation**: AI-powered loan-to-value ratios
- **Borrowing**: Access liquidity against tokenized assets

### 4. Smart Contract Integration

#### Frontend Hooks
```typescript
// Identity verification
const { isVerified, verifyUser } = useIdentityRegistry();

// Document storage
const { storeDocument } = useDocumentVault();

// Token operations
const { mint, balance } = useRWAToken();

// Collateral management
const { registerCollateral, ltv } = useAICollateralAgent();

// Lending
const { borrow } = useRWALendingProtocol();
```

#### Backend Services
```javascript
// Contract interactions
await contractService.verifyUser(userAddress);
await contractService.storeDocument(userAddress, cid, docHash);
await contractService.mintToken(toAddress, amount);

// Price feed management
await priceFeedService.updateAllPrices();
await priceFeedService.updateSpecificAsset('REAL_ESTATE_CHENNAI');
```

## 📊 API Endpoints

### Contract Interactions
- `POST /api/contract/verify-user` - Verify user identity
- `GET /api/contract/is-verified/:userAddress` - Check verification status
- `POST /api/contract/mint-token` - Mint RWA tokens
- `GET /api/contract/token-balance/:userAddress` - Get token balance
- `POST /api/contract/register-collateral` - Register collateral
- `GET /api/contract/collateral/:userAddress` - Get collateral info
- `GET /api/contract/ltv/:userAddress` - Calculate LTV
- `POST /api/contract/borrow` - Borrow funds
- `GET /api/contract/borrowed/:userAddress` - Get borrowed amount

### Price Feed Management
- `POST /api/price-feed/update-all` - Update all prices
- `POST /api/price-feed/update/:assetSymbol` - Update specific asset
- `GET /api/price-feed/all-prices` - Get all current prices
- `GET /api/price-feed/status` - Get service status

## 🔄 Asset Types

### Predefined Assets (Pyth Oracle)
- **AAPL**: Apple Inc. stock
- **TSLA**: Tesla Inc. stock  
- **NVDA**: NVIDIA Corporation stock
- **XAU**: Gold
- **XAG**: Silver
- **BRENT**: Brent Crude Oil

### Custom Assets (ASI Alliance)
- **REAL_ESTATE_CHENNAI**: Real estate in Chennai
- **INVOICE_FACTORING**: Invoice factoring
- **CARBON_CREDITS**: Carbon offset credits
- **COMMERCIAL_PROPERTY**: Commercial real estate
- **RESIDENTIAL_PROPERTY**: Residential real estate

## 🛡️ Security Features

- **Identity Verification**: On-chain KYC through Identity Registry
- **Document Integrity**: IPFS + on-chain hash verification
- **Compliance**: Transfer restrictions via Compliance Manager
- **ZK Proofs**: Zero-knowledge verification for sensitive data
- **Multi-source Pricing**: Pyth + ASI for price validation

## 🔧 Configuration

### Environment Variables

#### Frontend (.env.local)
```env
VITE_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id
VITE_SEPOLIA_RPC_URL=https://rpc.sepolia.org
```

#### Backend (.env)
```env
MONGO_URI=mongodb://localhost:27017/rwa-platform
SEPOLIA_RPC_URL=https://rpc.sepolia.org
PRIVATE_KEY=0x...your_private_key
ASI_ONE_API_KEY=your_asi_alliance_api_key
PORT=3000
```

### Contract Configuration
All contract addresses are centralized in `Frontend/src/config/contracts.ts` and `Backend/src/services/contractService.js`.

## 📈 Monitoring & Analytics

### Price Feed Monitoring
- Real-time price updates every 5 minutes
- Confidence scores from ASI Alliance
- Multi-source data validation
- Error handling and retry logic

### Transaction Tracking
- All contract interactions are logged
- Transaction hashes stored for verification
- User activity tracking
- Asset valuation history

## 🚨 Troubleshooting

### Common Issues

1. **Wallet Connection Issues**
   - Ensure you're on Sepolia testnet
   - Check WalletConnect project ID
   - Verify RPC URL is accessible

2. **Contract Interaction Failures**
   - Check if contracts are deployed
   - Verify contract addresses
   - Ensure sufficient gas fees

3. **Price Feed Issues**
   - Check ASI API key validity
   - Verify network connectivity
   - Check cron job status

### Debug Mode
Enable debug logging by setting `NODE_ENV=development` in backend environment.

## 🔮 Future Enhancements

- [ ] Multi-chain support (Polygon, Arbitrum)
- [ ] Advanced ZK proofs for privacy
- [ ] Automated liquidation mechanisms
- [ ] Governance token integration
- [ ] Mobile app support
- [ ] Advanced analytics dashboard

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the smart contract code

---

**Note**: This is a testnet deployment. Do not use with mainnet assets or real funds.


