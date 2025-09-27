// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./IdentityRegistry.sol";
import "./ComplianceManager.sol";

contract RWAToken {
    string public name = "RWA Token";
    string public symbol = "RWA";
    uint8 public decimals = 18;
    uint256 public totalSupply;

    mapping(address => uint256) public balanceOf;

    IdentityRegistry public identityRegistry;
    ComplianceManager public compliance;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Mint(address indexed to, uint256 value);

    constructor(address _identityRegistry, address _compliance) {
        identityRegistry = IdentityRegistry(_identityRegistry);
        compliance = ComplianceManager(_compliance);
    }

    function transfer(address to, uint256 amount) external returns (bool) {
        require(identityRegistry.isVerified(msg.sender), "Sender not verified");
        require(identityRegistry.isVerified(to), "Recipient not verified");
        require(compliance.isTransferAllowed(msg.sender, to, amount), "Transfer not compliant");
        require(balanceOf[msg.sender] >= amount, "Insufficient balance");

        balanceOf[msg.sender] -= amount;
        balanceOf[to] += amount;
        emit Transfer(msg.sender, to, amount);
        return true;
    }

    function mint(address to, uint256 amount) external {
        require(identityRegistry.isVerified(to), "Recipient not verified");
        balanceOf[to] += amount;
        totalSupply += amount;
        emit Mint(to, amount);
    }
}