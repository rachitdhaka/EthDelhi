// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./IASIOracle.sol";

contract MockASIOracle is IASIOracle {
    mapping(string => uint256) public prices;

    function setPrice(string calldata assetSymbol, uint256 price) external {
        prices[assetSymbol] = price;
    }

    function getPrice(string calldata assetSymbol) external view returns (uint256) {
        return prices[assetSymbol];
    }
}