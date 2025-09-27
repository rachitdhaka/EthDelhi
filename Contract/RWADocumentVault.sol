// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./IdentityRegistry.sol";

contract RWADocumentVault {
    mapping(address => string) public userDocumentCID;
    mapping(address => bytes32) public userDocumentHash;

    IdentityRegistry public identityRegistry;

    event DocumentStored(address indexed user, string cid, bytes32 docHash);

    constructor(address _identityRegistry) {
        identityRegistry = IdentityRegistry(_identityRegistry);
    }

    function storeDocument(string calldata cid, bytes32 docHash) external {
        require(identityRegistry.isVerified(msg.sender), "Unverified user");
        userDocumentCID[msg.sender] = cid;
        userDocumentHash[msg.sender] = docHash;
        emit DocumentStored(msg.sender, cid, docHash);
    }
}