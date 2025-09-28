import { contractService } from './contractService.js';
import { fetchRWAValuation } from './asiService.js';
import { filecoinService } from './filecoinService.js';
import cron from 'node-cron';

// Asset symbols that need ASI price updates
const ASI_ASSETS = [
  'REAL_ESTATE_CHENNAI',
  'INVOICE_FACTORING', 
  'CARBON_CREDITS',
  'COMMERCIAL_PROPERTY',
  'RESIDENTIAL_PROPERTY'
];

// Pyth-supported assets (these get prices from Pyth, not ASI)
const PYTH_ASSETS = [
  'AAPL',
  'TSLA', 
  'NVDA',
  'XAU', // Gold
  'XAG', // Silver
  'BRENT' // Oil
];

class PriceFeedService {
  constructor() {
    this.isRunning = false;
    this.updateInterval = 5; // minutes
  }

  // Start the price feed service
  start() {
    if (this.isRunning) {
      console.log('Price feed service is already running');
      return;
    }

    console.log('Starting ASI price feed service...');
    this.isRunning = true;

    // Update prices immediately
    this.updateAllPrices();

    // Schedule regular updates every 5 minutes
    cron.schedule(`*/${this.updateInterval} * * * *`, () => {
      console.log('Running scheduled price update...');
      this.updateAllPrices();
    });

    console.log(`Price feed service started. Updates every ${this.updateInterval} minutes.`);
  }

  // Stop the price feed service
  stop() {
    this.isRunning = false;
    console.log('Price feed service stopped');
  }

  // Update prices for all ASI-supported assets
  async updateAllPrices() {
    if (!this.isRunning) return;

    console.log('Updating ASI prices for all assets...');
    
    for (const assetSymbol of ASI_ASSETS) {
      try {
        await this.updateAssetPrice(assetSymbol);
        // Add delay between requests to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (error) {
        console.error(`Failed to update price for ${assetSymbol}:`, error.message);
      }
    }

    console.log('ASI price update cycle completed');
  }

  // Update price for a specific asset
  async updateAssetPrice(assetSymbol) {
    try {
      console.log(`Fetching ASI price for ${assetSymbol}...`);
      
      // Get Filecoin price context
      const filPriceData = await filecoinService.getFilecoinPrice();
      console.log(`📊 FIL Price Context: $${filPriceData.price} (${filPriceData.sources} sources)`);
      
      // Get valuation from ASI service
      const valuation = await fetchRWAValuation(assetSymbol, 'real-estate'); // Default type
      
      if (!valuation || !valuation.final_value_USD) {
        throw new Error('Invalid valuation response from ASI');
      }

      const price = parseFloat(valuation.final_value_USD);
      
      if (isNaN(price) || price <= 0) {
        throw new Error('Invalid price value');
      }

      // Update price on-chain
      await contractService.setASIPrice(assetSymbol, price.toString());
      
      console.log(`✅ Updated ${assetSymbol} price to $${price} (confidence: ${valuation.confidence_score}%)`);
      
      return {
        assetSymbol,
        price,
        confidence: valuation.confidence_score,
        timestamp: new Date().toISOString(),
        sources: valuation.data_sources_used,
        filPrice: filPriceData.price,
        filContext: true
      };

    } catch (error) {
      console.error(`❌ Failed to update ${assetSymbol}:`, error.message);
      throw error;
    }
  }

  // Get current price for an asset
  async getAssetPrice(assetSymbol) {
    try {
      const price = await contractService.getASIPrice(assetSymbol);
      return {
        assetSymbol,
        price: parseFloat(price),
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error(`Failed to get price for ${assetSymbol}:`, error.message);
      return null;
    }
  }

  // Get prices for all assets
  async getAllPrices() {
    const prices = {};
    
    for (const assetSymbol of [...ASI_ASSETS, ...PYTH_ASSETS]) {
      try {
        const priceData = await this.getAssetPrice(assetSymbol);
        if (priceData) {
          prices[assetSymbol] = priceData;
        }
      } catch (error) {
        console.error(`Failed to get price for ${assetSymbol}:`, error.message);
      }
    }

    return prices;
  }

  // Manual price update endpoint
  async updateSpecificAsset(assetSymbol) {
    if (!ASI_ASSETS.includes(assetSymbol)) {
      throw new Error(`Asset ${assetSymbol} is not supported for ASI price updates`);
    }

    return await this.updateAssetPrice(assetSymbol);
  }

  // Get service status
  getStatus() {
    return {
      isRunning: this.isRunning,
      updateInterval: this.updateInterval,
      supportedAssets: ASI_ASSETS,
      pythAssets: PYTH_ASSETS,
      lastUpdate: new Date().toISOString()
    };
  }
}

// Create singleton instance
const priceFeedService = new PriceFeedService();

export { priceFeedService };
export default priceFeedService;


