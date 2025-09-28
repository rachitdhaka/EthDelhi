# Filecoin Synapse SDK Integration Guide

## 🚀 **Quick Setup for Price Tracking Application**

### 1. **Install Dependencies**
```bash
cd Backend
npm install @filoz/synapse-sdk node-fetch
```

### 2. **Environment Configuration**
Add to your `Backend/.env` file:
```env
# Filecoin Network Configuration
FILECOIN_NETWORK=testnet
FILECOIN_RPC_URL=https://api.node.glif.io/rpc/v0
FILECOIN_PRIVATE_KEY=your_filecoin_private_key_here

# Optional: API Keys for Enhanced Price Data
COINMARKETCAP_API_KEY=your_coinmarketcap_api_key
COINGECKO_API_KEY=your_coingecko_api_key
```

### 3. **Get Filecoin Private Key**
```bash
# Generate new Filecoin wallet
filecoin-wallet new

# Or use existing private key
# Format: 0x1234567890abcdef...
```

## 📊 **Price Tracking Features**

### **Real-time Filecoin Price**
- ✅ **Multiple Sources**: CoinGecko, CoinMarketCap, DIA Oracle
- ✅ **Price Context**: FIL price context for RWA valuations
- ✅ **Fallback Support**: Mock prices for development
- ✅ **API Endpoints**: RESTful API for price data

### **RWA Asset Price Integration**
- ✅ **Pyth Assets**: Real-time price feeds (AAPL, TSLA, etc.)
- ✅ **ASI Assets**: Custom valuations with FIL context
- ✅ **Price History**: Historical data for analysis
- ✅ **Confidence Scores**: ASI Alliance confidence ratings

## 🔧 **API Endpoints**

### **Filecoin Price Data**
```bash
# Get current FIL price
GET /api/filecoin/price

# Get network information
GET /api/filecoin/network

# Get storage providers
GET /api/filecoin/providers
```

### **RWA Asset Prices**
```bash
# Get RWA asset price with FIL context
GET /api/filecoin/rwa-price?assetSymbol=REAL_ESTATE_CHENNAI&isPyth=false

# Get price history
GET /api/filecoin/price-history?assetSymbol=AAPL&days=30
```

### **Storage Services**
```bash
# Create storage service
POST /api/filecoin/storage-service
{
  "name": "RWA Document Storage",
  "description": "Secure storage for RWA documents",
  "price": 0.1,
  "duration": 1000,
  "capacity": 1073741824
}
```

## 🎯 **Price Tracking Application Features**

### **1. Multi-Source Price Aggregation**
```javascript
// Get FIL price from multiple sources
const filPrice = await filecoinService.getFilecoinPrice();
// Returns: { price: 2.19, sources: 3, timestamp: "2024-01-01T00:00:00Z" }
```

### **2. RWA Asset Valuation with FIL Context**
```javascript
// Get RWA asset price with Filecoin context
const rwaPrice = await filecoinService.getRWAAssetPrice('REAL_ESTATE_CHENNAI', false);
// Returns: { price: 250000, filPrice: 2.19, filContext: true }
```

### **3. Price History Analysis**
```javascript
// Get 30-day price history
const history = await filecoinService.getPriceHistory('AAPL', 30);
// Returns: { symbol: 'AAPL', prices: [...], marketCaps: [...], totalVolumes: [...] }
```

## 🔍 **Integration with Your RWA Platform**

### **Price Feed Service Enhancement**
Your existing price feed service now includes:
- ✅ **FIL Price Context**: Every ASI price update includes FIL price
- ✅ **Enhanced Logging**: Detailed price source information
- ✅ **Confidence Scoring**: ASI Alliance confidence ratings
- ✅ **Multi-Source Validation**: Multiple price sources for reliability

### **Smart Contract Integration**
- ✅ **On-chain Storage**: IPFS CIDs stored in smart contracts
- ✅ **Price Updates**: ASI prices updated with FIL context
- ✅ **LTV Calculations**: Enhanced with Filecoin price context

## 🧪 **Testing the Integration**

### **1. Test Filecoin Connection**
```bash
curl http://localhost:3000/api/filecoin/network
```

### **2. Test Price Data**
```bash
curl http://localhost:3000/api/filecoin/price
```

### **3. Test RWA Asset Price**
```bash
curl "http://localhost:3000/api/filecoin/rwa-price?assetSymbol=REAL_ESTATE_CHENNAI&isPyth=false"
```

## 📈 **Production Considerations**

### **For Production Use:**
1. **Use Mainnet**: Set `FILECOIN_NETWORK=mainnet`
2. **Secure Private Keys**: Use environment variables
3. **API Rate Limits**: Implement rate limiting
4. **Error Handling**: Robust error handling
5. **Monitoring**: Set up price monitoring alerts

### **Security Best Practices:**
- Store private keys securely
- Use HTTPS for all API calls
- Implement API authentication
- Monitor for unusual price movements
- Set up alerts for price anomalies

## 🎯 **Price Tracking Application Benefits**

### **For Your RWA Platform:**
- ✅ **Enhanced Accuracy**: Multi-source price validation
- ✅ **FIL Context**: Filecoin price context for all valuations
- ✅ **Real-time Updates**: Automated price updates every 5 minutes
- ✅ **Historical Analysis**: Price history for trend analysis
- ✅ **Confidence Scoring**: ASI Alliance confidence ratings

### **For Users:**
- ✅ **Transparent Pricing**: Clear price sources and confidence
- ✅ **Real-time Data**: Up-to-date asset valuations
- ✅ **Historical Context**: Price trends and analysis
- ✅ **Reliable LTV**: Enhanced loan-to-value calculations

## 🚀 **Next Steps**

1. **Install Dependencies**: Run `npm install` in Backend
2. **Configure Environment**: Set up your `.env` file
3. **Test Integration**: Use the API endpoints
4. **Monitor Prices**: Set up price monitoring
5. **Deploy**: Deploy with proper security measures

Your RWA platform now has **Filecoin Synapse SDK integration** for enhanced price tracking! 🎉

## 📞 **Support**

If you encounter issues:
1. Check the logs for error messages
2. Verify your private key format
3. Ensure network connectivity
4. Check API rate limits
5. Review the Filecoin documentation

**Happy Price Tracking!** 📊🚀
