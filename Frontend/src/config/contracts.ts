// Contract addresses on Sepolia testnet
export const CONTRACT_ADDRESSES = {
  IDENTITY_REGISTRY: '0xDAcE33E005a7506857Ebd9506fa96302d6eAdDe3',
  COMPLIANCE_MANAGER: '0xBBE5cc1D17Af64aceC326447dE0AD211A136832A',
  RWA_TOKEN: '0x0d397Ff2B28ab07eAe86cd85c4a422fEAE340442',
  ZK_VERIFIER: '0x3E3BBAE354625d5CE63Ca8Cf098Eb6c82DbA5452',
  RWA_DOCUMENT_VAULT: '0x7babE1412Ea83B8562102Eb2A4773ee4daf7cfe6',
  MOCK_ASI_ORACLE: '0x3EE222EA493b5c29689F0ca751E33be88e59CB36',
  AI_COLLATERAL_AGENT: '0xcA39901735315B253c32F6614d706a5918bd1e35',
  RWA_LENDING_PROTOCOL: '0x4B400B7FB7a3B850bBCBf1c0e038bbb076F6F865',
} as const;

// Contract ABIs - extracted from your Solidity contracts
export const IDENTITY_REGISTRY_ABI = [
  {
    "inputs": [{"internalType": "address", "name": "user", "type": "address"}],
    "name": "verifyUser",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "user", "type": "address"}],
    "name": "isVerified",
    "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [{"indexed": true, "internalType": "address", "name": "user", "type": "address"}],
    "name": "UserVerified",
    "type": "event"
  }
] as const;

export const RWA_DOCUMENT_VAULT_ABI = [
  {
    "inputs": [
      {"internalType": "string", "name": "cid", "type": "string"},
      {"internalType": "bytes32", "name": "docHash", "type": "bytes32"}
    ],
    "name": "storeDocument",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "user", "type": "address"}],
    "name": "userDocumentCID",
    "outputs": [{"internalType": "string", "name": "", "type": "string"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "user", "type": "address"}],
    "name": "userDocumentHash",
    "outputs": [{"internalType": "bytes32", "name": "", "type": "bytes32"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "address", "name": "user", "type": "address"},
      {"indexed": false, "internalType": "string", "name": "cid", "type": "string"},
      {"indexed": false, "internalType": "bytes32", "name": "docHash", "type": "bytes32"}
    ],
    "name": "DocumentStored",
    "type": "event"
  }
] as const;

export const AI_COLLATERAL_AGENT_ABI = [
  {
    "inputs": [
      {"internalType": "address", "name": "user", "type": "address"},
      {"internalType": "string", "name": "asset", "type": "string"},
      {"internalType": "uint256", "name": "appraisalValue", "type": "uint256"},
      {"internalType": "bytes", "name": "zkProof", "type": "bytes"}
    ],
    "name": "registerCollateral",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "user", "type": "address"}],
    "name": "calculateLTV",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "string", "name": "asset", "type": "string"},
      {"internalType": "bool", "name": "isPyth", "type": "bool"}
    ],
    "name": "getLivePrice",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "user", "type": "address"}],
    "name": "userCollateral",
    "outputs": [
      {"internalType": "string", "name": "asset", "type": "string"},
      {"internalType": "uint256", "name": "appraisalValue", "type": "uint256"},
      {"internalType": "bool", "name": "active", "type": "bool"},
      {"internalType": "bool", "name": "isPythAsset", "type": "bool"}
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const;

export const RWA_TOKEN_ABI = [
  {
    "inputs": [
      {"internalType": "address", "name": "to", "type": "address"},
      {"internalType": "uint256", "name": "amount", "type": "uint256"}
    ],
    "name": "mint",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "account", "type": "address"}],
    "name": "balanceOf",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "address", "name": "to", "type": "address"},
      {"internalType": "uint256", "name": "amount", "type": "uint256"}
    ],
    "name": "transfer",
    "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "name",
    "outputs": [{"internalType": "string", "name": "", "type": "string"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [{"internalType": "string", "name": "", "type": "string"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  }
] as const;

export const RWA_LENDING_PROTOCOL_ABI = [
  {
    "inputs": [{"internalType": "uint256", "name": "amount", "type": "uint256"}],
    "name": "borrow",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "user", "type": "address"}],
    "name": "borrowedAmounts",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  }
] as const;

export const MOCK_ASI_ORACLE_ABI = [
  {
    "inputs": [
      {"internalType": "string", "name": "assetSymbol", "type": "string"},
      {"internalType": "uint256", "name": "price", "type": "uint256"}
    ],
    "name": "setPrice",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "string", "name": "assetSymbol", "type": "string"}],
    "name": "getPrice",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  }
] as const;

// Predefined assets that are supported by Pyth Oracle
export const PYTH_SUPPORTED_ASSETS = [
  'AAPL',
  'TSLA', 
  'NVDA',
  'XAU', // Gold
  'XAG', // Silver
  'BRENT' // Oil
] as const;

// Asset types for the frontend
export const ASSET_TYPES = [
  { id: 'real-estate', name: 'Real Estate', symbol: 'REAL_ESTATE_CHENNAI', isPyth: false },
  { id: 'invoice', name: 'Invoice', symbol: 'INVOICE_FACTORING', isPyth: false },
  { id: 'carbon-credits', name: 'Carbon Credits', symbol: 'CARBON_CREDITS', isPyth: false },
  { id: 'commodities', name: 'Commodities', symbol: 'XAU', isPyth: true },
  { id: 'stocks', name: 'Stocks', symbol: 'AAPL', isPyth: true },
] as const;


