// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract ComplianceManager {
    mapping(address => bool) public blacklisted;

    function isTransferAllowed(address from, address to, uint256 /*amount*/) external view returns (bool) {
        if (blacklisted[from] || blacklisted[to]) {
            return false;
        }
        return true;
    }

    function blacklistUser(address user) external {
        blacklisted[user] = true;
    }
}