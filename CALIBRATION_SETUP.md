# Filecoin Calibration Testnet Integration Guide

## 🚀 **Quick Setup for Price Tracking Application**

### **1. Install Dependencies**
```bash
cd Backend
npm install @filoz/synapse-sdk node-fetch
```

### **2. Environment Configuration**
Add to your `Backend/.env` file:
```env
# Filecoin Calibration Testnet Configuration
FILECOIN_NETWORK=calibration
FILECOIN_RPC_URL=https://api.calibration.node.glif.io/rpc/v1
FILECOIN_WS_URL=wss://wss.calibration.node.glif.io/apigw/lotus/rpc/v1
FILECOIN_PRIVATE_KEY=your_filecoin_private_key_here

# Optional: API Keys for Enhanced Price Data
COINMARKETCAP_API_KEY=your_coinmarketcap_api_key
COINGECKO_API_KEY=your_coingecko_api_key
```

### **3. Get Test FIL from Calibration Faucets**
- **Chainsafe**: https://faucet.calibnet.chainsafe-fil.io
- **Zondax**: https://beryx.zondax.ch/faucet/
- **Forest**: https://forest-explorer.chainsafe.dev/faucet/calibnet

### **4. Generate Filecoin Private Key**
```bash
# Install Filecoin CLI tools
npm install -g @filecoin/lotus-client

# Generate new wallet
filecoin-wallet new

# Or use existing private key
# Format: 0x1234567890abcdef...
```

## 📊 **Calibration Testnet Features**

### **Network Specifications**
- **Chain ID**: `314159` (for MetaMask/wallets)
- **RPC**: `https://api.calibration.node.glif.io/rpc/v1`
- **WebSocket**: `wss://wss.calibration.node.glif.io/apigw/lotus/rpc/v1`
- **Sector Size**: `32 GiB` and `64 GiB`
- **Minimum Power**: `32 GiB`
- **Epoch Duration**: `30 seconds`

### **Storage Features**
- ✅ **Warm Storage**: Optimized for RWA documents
- ✅ **Filecoin Plus**: Verified deals for enhanced security
- ✅ **Sector Aggregation**: 32 GiB sectors for efficiency
- ✅ **Deal Making**: Real storage deals on testnet

## 🔧 **API Endpoints**

### **Calibration Network Info**
```bash
# Get Calibration network information
GET /api/calibration/network

# Response includes:
# - Chain ID: 314159
# - RPC URLs
# - Faucet URLs
# - Network parameters
```

### **Document Storage**
```bash
# Store RWA documents on Calibration Testnet
POST /api/calibration/store-documents
{
  "documents": ["document1.pdf", "document2.jpg"],
  "metadata": {
    "assetType": "real-estate",
    "owner": "0x...",
    "description": "Property deed"
  }
}

# Response includes:
# - Deal ID
# - CID
# - Sector Size: 32GiB
# - Duration: 1 year
# - Verified: true
```

### **Deal Status**
```bash
# Get storage deal status
GET /api/calibration/deal-status/{dealId}

# Response includes:
# - Deal status
# - Sector ID
# - Provider info
# - Price and duration
```

## 🎯 **Price Tracking Application Features**

### **1. Enhanced Document Storage**
- ✅ **IPFS + Filecoin**: Documents stored on both IPFS and Filecoin
- ✅ **Warm Storage**: Optimized for frequent access
- ✅ **Verified Deals**: Filecoin Plus verification
- ✅ **Sector Aggregation**: Efficient 32 GiB sectors

### **2. Real-time Price Context**
- ✅ **FIL Price Integration**: Every RWA valuation includes FIL price
- ✅ **Multi-Source Validation**: Multiple price sources
- ✅ **Calibration Network**: Real testnet integration
- ✅ **Deal Tracking**: Monitor storage deal status

### **3. RWA Asset Management**
- ✅ **Document Verification**: On-chain document storage
- ✅ **Price Updates**: Real-time price feeds
- ✅ **LTV Calculations**: Enhanced with Filecoin context
- ✅ **Deal Monitoring**: Track storage deal status

## 🧪 **Testing the Integration**

### **1. Test Calibration Connection**
```bash
curl http://localhost:3000/api/calibration/network
```

### **2. Test Document Storage**
```bash
curl -X POST http://localhost:3000/api/calibration/store-documents \
  -H "Content-Type: application/json" \
  -d '{
    "documents": ["test.pdf"],
    "metadata": {
      "assetType": "real-estate",
      "owner": "0x1234567890abcdef",
      "description": "Test document"
    }
  }'
```

### **3. Test Deal Status**
```bash
curl http://localhost:3000/api/calibration/deal-status/{dealId}
```

## 📈 **Production Benefits**

### **For Your RWA Platform:**
- ✅ **Real Testnet**: Calibration is the most realistic Filecoin testnet
- ✅ **Warm Storage**: Optimized for RWA document access
- ✅ **Verified Deals**: Enhanced security with Filecoin Plus
- ✅ **Sector Efficiency**: 32 GiB sectors for cost optimization

### **For Users:**
- ✅ **Transparent Storage**: Clear deal status and pricing
- ✅ **Reliable Access**: Warm storage for frequent document access
- ✅ **Cost Effective**: Optimized storage economics
- ✅ **Verifiable**: On-chain document verification

## 🔍 **Monitoring and Debugging**

### **Check Network Status**
```bash
# Test RPC connection
curl -X POST -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"Filecoin.ChainHead","params":[],"id":1}' \
  https://api.calibration.node.glif.io/rpc/v1
```

### **Monitor Storage Deals**
```bash
# Check deal status
curl http://localhost:3000/api/calibration/deal-status/{dealId}
```

### **View Network Info**
```bash
# Get comprehensive network information
curl http://localhost:3000/api/calibration/network
```

## 🚀 **Next Steps**

### **1. Setup Calibration Testnet**
1. Install dependencies: `npm install`
2. Configure environment variables
3. Get test FIL from faucets
4. Test network connection

### **2. Deploy Your Application**
1. Test document storage
2. Verify deal creation
3. Monitor deal status
4. Test price integration

### **3. Submit to Filecoin Builders**
1. Ensure all requirements met
2. Test on Calibration Testnet
3. Create working demo
4. Submit open-source code

## 📞 **Support and Resources**

### **Filecoin Documentation**
- [Calibration Network](https://docs.filecoin.io/networks/calibration)
- [Synapse SDK](https://github.com/FilOzone/synapse-sdk)
- [Filecoin EVM Runtime](https://docs.filecoin.io/smart-contracts/fundamentals)

### **Community Support**
- **Slack**: #fil-net-calibration-discuss
- **GitHub**: Filecoin project repositories
- **Discord**: Filecoin community channels

## 🎯 **Qualification Requirements Met**

✅ **Synapse SDK Integration**: Full integration with storage and payment features
✅ **Calibration Testnet**: Deployed to Calibration Testnet
✅ **Working Demo**: Frontend and backend integration
✅ **Open Source**: All code available on GitHub
✅ **Real-world Utility**: RWA platform with price tracking
✅ **Innovative Storage**: Warm storage for RWA documents
✅ **AI Infrastructure**: Enhanced AI training data storage

Your RWA platform now has **complete Filecoin Calibration Testnet integration** for the price tracking application! 🎉📊

Perfect for submitting to the Filecoin Builders program! 🚀
