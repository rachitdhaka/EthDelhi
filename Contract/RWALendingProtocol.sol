// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./AICollateralAgent.sol";
import "./RWAToken.sol";

interface IStablecoin {
    function transfer(address to, uint256 amount) external returns (bool);
}

contract RWALendingProtocol {
    AICollateralAgent public aiAgent;
    IStablecoin public stablecoin;
    RWAToken public rwaToken;
    uint256 public constant MIN_LTV = 800000000000000000; // 80%

    mapping(address => uint256) public borrowedAmounts;

    constructor(address _aiAgent, address _stablecoin, address _rwaToken) {
        aiAgent = AICollateralAgent(_aiAgent);
        stablecoin = IStablecoin(_stablecoin);
        rwaToken = RWAToken(_rwaToken);
    }

    function borrow(uint256 amount) external {
        uint256 ltv = aiAgent.calculateLTV(msg.sender);
        require(ltv >= MIN_LTV, "Insufficient collateral");
        
        uint256 collateralValue = rwaToken.balanceOf(msg.sender);
        require(collateralValue >= amount * MIN_LTV / 1e18, "Insufficient collateral value");

        borrowedAmounts[msg.sender] += amount;
        stablecoin.transfer(msg.sender, amount);
    }
}