// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract IdentityRegistry {
    mapping(address => bool) public verifiedUsers;

    event UserVerified(address indexed user);

    function verifyUser(address user) external {
        verifiedUsers[user] = true;
        emit UserVerified(user);
    }

    function isVerified(address user) external view returns (bool) {
        return verifiedUsers[user];
    }
}