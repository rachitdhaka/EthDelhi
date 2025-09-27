// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./IPyth.sol";        
import "./PythStructs.sol";   
import "./ZKVerifier.sol";
import "./RWADocumentVault.sol";
import "./IASIOracle.sol";

contract AICollateralAgent {
    IPyth public pyth;
    IASIOracle public asiOracle;
    ZKVerifier public zkVerifier;
    RWADocumentVault public documentVault;
    address public admin;

    struct Collateral {
        string asset;
        uint256 appraisalValue;
        bool active;
        bool isPythAsset;
    }

    mapping(address => Collateral) public userCollateral;

    bytes32 constant FEED_AAPL = 0x49f6b65cb1de6b10eaf75e7c03ca029c306d0357e91b5311b175084a5ad55688;
    bytes32 constant FEED_TSLA = 0x16dad506d7db8da01c87581c87ca897a012a153557d4d578c3b9c9e1bc0632f1;
    bytes32 constant FEED_NVDA = 0xb1073854ed24cbc755dc527418f52b7d271f6cc967bbf8d8129112b18860a593;
    bytes32 constant FEED_XAU  = 0x765d2ba906dbc32ca17cc11f5310a89e9ee1f6420508c63861f2f8ba4ee34bb2;
    bytes32 constant FEED_XAG  = 0xf2fb02c32b055c805e7238d628e5e9dadef274376114eb1f012337cabe93871e;
    bytes32 constant FEED_BRENT = 0x14cc780e57246819f68589d9646f507e70b637d14ac0dff2d384cfbc792a0256;

    modifier onlyAdmin() {
        require(msg.sender == admin, "Not admin");
        _;
    }

    constructor(
        address _pythAddress,
        address _asiOracleAddress,
        address _zkVerifierAddress,
        address _documentVaultAddress
    ) {
        pyth = IPyth(_pythAddress);
        asiOracle = IASIOracle(_asiOracleAddress);
        zkVerifier = ZKVerifier(_zkVerifierAddress);
        documentVault = RWADocumentVault(_documentVaultAddress);
        admin = msg.sender;
    }

    function registerCollateral(
        address user,
        string calldata asset,
        uint256 appraisalValue,
        bytes calldata zkProof
    ) external onlyAdmin {
        bytes32 docHash = documentVault.userDocumentHash(user);
        require(docHash != bytes32(0), "No document stored");
        require(zkVerifier.verifyProof(zkProof, docHash), "Invalid ZK proof");

        bool pythSupported = isPythSupported(asset);
        userCollateral[user] = Collateral(asset, appraisalValue, true, pythSupported);
    }

    function isPythSupported(string memory asset) internal pure returns (bool) {
        bytes32 assetHash = keccak256(bytes(asset));
        return (
            assetHash == keccak256("AAPL") ||
            assetHash == keccak256("TSLA") ||
            assetHash == keccak256("NVDA") ||
            assetHash == keccak256("XAU") ||
            assetHash == keccak256("XAG") ||
            assetHash == keccak256("BRENT")
        );
    }

    function getFeedId(string memory asset) internal pure returns (bytes32) {
        bytes32 assetHash = keccak256(bytes(asset));
        if (assetHash == keccak256("AAPL")) return FEED_AAPL;
        if (assetHash == keccak256("TSLA")) return FEED_TSLA;
        if (assetHash == keccak256("NVDA")) return FEED_NVDA;
        if (assetHash == keccak256("XAU"))  return FEED_XAU;
        if (assetHash == keccak256("XAG"))  return FEED_XAG;
        if (assetHash == keccak256("BRENT")) return FEED_BRENT;
        revert("Unsupported Pyth asset");
    }

    function getLivePrice(string memory asset, bool isPyth) public view returns (uint256) {
        if (isPyth) {
            bytes32 feedId = getFeedId(asset);
            PythStructs.Price memory priceStruct = pyth.getPriceUnsafe(feedId);
            require(priceStruct.price > 0, "Invalid Pyth price");
            return uint256(int256(priceStruct.price));
        } else {
            uint256 asiPrice = asiOracle.getPrice(asset);
            require(asiPrice > 0, "Invalid ASI price");
            return asiPrice;
        }
    }

    function calculateLTV(address user) external view returns (uint256) {
        Collateral memory col = userCollateral[user];
        require(col.active, "No active collateral");

        uint256 marketPrice = getLivePrice(col.asset, col.isPythAsset);
        require(col.appraisalValue > 0, "Missing appraisal");

        return (marketPrice * 1e18) / col.appraisalValue;
    }

    function deactivateCollateral(address user) external onlyAdmin {
        userCollateral[user].active = false;
    }
}