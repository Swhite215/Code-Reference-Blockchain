// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.3;

import "@openzeppelin/contracts/utils/Counters.sol"; // Utility Contract - Use to Increment Token IDs Consistently
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol"; // Extension to ERC721 Token, Use it to Set Token URIs to Save files
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract NFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    address contractAddress; // Address of NFT Marketplace Address

    constructor (address marketplaceAddress) ERC721("NFT Marketplace", "NMP") {
        contractAddress = marketplaceAddress;
    }

    function createToken(string memory tokenURI) public returns (uint) {
        _tokenIds.increment(); // Use Counter to Increment
        uint256 newItemId = _tokenIds.current(); // Use Counter

        _mint(msg.sender, newItemId); // Use ERC 721 Inherited Method
        _setTokenURI(newItemId, tokenURI); // Use ERC 721 URI Storage Inherited Method
        setApprovalForAll(contractAddress, true); // Use ERC 721 Inherited Method
        return newItemId;
    }


}

