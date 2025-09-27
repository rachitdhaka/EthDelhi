// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract ZKVerifier {
    function verifyProof(bytes calldata proof, bytes32 documentHash) external pure returns (bool) {
        return keccak256(proof) == documentHash;
    }
}