// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./IdentityRegistry.sol";
import "./ComplianceManager.sol";

/**
 * @title RWAToken
 * @dev ERC-3643 compliant token for Real World Asset tokenization
 * @notice This contract implements the ERC-3643 standard for security tokens
 * with built-in compliance and identity verification
 */
contract RWAToken {
    // ERC-3643 Standard Events
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Mint(address indexed to, uint256 value);
    event Burn(address indexed from, uint256 value);
    event ComplianceStatusChanged(address indexed _identity, bool _isCompliant);
    event IdentityRegistered(address indexed _identity, bool _isRegistered);
    event TokenFrozen(address indexed _user);
    event TokenUnfrozen(address indexed _user);
    
    // ERC-3643 Standard Variables
    string public name = "RWA Security Token";
    string public symbol = "RWA";
    uint8 public decimals = 18;
    uint256 public totalSupply;
    uint256 public granularity = 1; // ERC-3643 granularity
    
    mapping(address => uint256) public balanceOf;
    mapping(address => bool) public frozen; // ERC-3643 frozen accounts
    mapping(address => bool) public complianceStatus; // ERC-3643 compliance status
    
    IdentityRegistry public identityRegistry;
    ComplianceManager public compliance;
    
    // ERC-3643 Access Control
    address public owner;
    mapping(address => bool) public agents; // ERC-3643 agents
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner");
        _;
    }
    
    modifier onlyAgent() {
        require(agents[msg.sender] || msg.sender == owner, "Only agent");
        _;
    }

    constructor(address _identityRegistry, address _compliance) {
        identityRegistry = IdentityRegistry(_identityRegistry);
        compliance = ComplianceManager(_compliance);
        owner = msg.sender;
        agents[msg.sender] = true;
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

    function mint(address to, uint256 amount) external onlyAgent {
        require(identityRegistry.isVerified(to), "Recipient not verified");
        require(!frozen[to], "Account frozen");
        require(amount % granularity == 0, "Amount not multiple of granularity");
        
        balanceOf[to] += amount;
        totalSupply += amount;
        emit Mint(to, amount);
    }
    
    function burn(address from, uint256 amount) external onlyAgent {
        require(balanceOf[from] >= amount, "Insufficient balance");
        require(amount % granularity == 0, "Amount not multiple of granularity");
        
        balanceOf[from] -= amount;
        totalSupply -= amount;
        emit Burn(from, amount);
    }
    
    // ERC-3643 Compliance Functions
    function setComplianceStatus(address _identity, bool _isCompliant) external onlyAgent {
        complianceStatus[_identity] = _isCompliant;
        emit ComplianceStatusChanged(_identity, _isCompliant);
    }
    
    function isCompliant(address _identity) external view returns (bool) {
        return complianceStatus[_identity] && identityRegistry.isVerified(_identity);
    }
    
    // ERC-3643 Freeze Functions
    function freeze(address _user) external onlyAgent {
        frozen[_user] = true;
        emit TokenFrozen(_user);
    }
    
    function unfreeze(address _user) external onlyAgent {
        frozen[_user] = false;
        emit TokenUnfrozen(_user);
    }
    
    function isFrozen(address _user) external view returns (bool) {
        return frozen[_user];
    }
    
    // ERC-3643 Agent Management
    function addAgent(address _agent) external onlyOwner {
        agents[_agent] = true;
    }
    
    function removeAgent(address _agent) external onlyOwner {
        agents[_agent] = false;
    }
    
    // ERC-3643 View Functions
    function getGranularity() external view returns (uint256) {
        return granularity;
    }
    
    function getComplianceStatus(address _identity) external view returns (bool) {
        return complianceStatus[_identity];
    }
}