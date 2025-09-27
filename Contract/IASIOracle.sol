// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface IASIOracle {
    function getPrice(string calldata assetSymbol) external view returns (uint256);
}