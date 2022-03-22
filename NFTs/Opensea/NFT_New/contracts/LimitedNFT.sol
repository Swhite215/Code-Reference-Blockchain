// SPDX-License-Identifier: MIT
pragma solidity 0.8.1;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract LimitedNFT is ERC721 {
  using Counters for Counters.Counter;

  Counters.Counter private currentTokenId;

  /// @dev Base token URI used as a prefix by tokenURI().
  string public baseTokenURI;

  constructor() ERC721("NFTTutorial", "NFT") {
    baseTokenURI = "";
  }

  function mintTo(address recipient) public returns (uint256) {
    currentTokenId.increment();
    uint256 newItemId = currentTokenId.current();
    _safeMint(recipient, newItemId);
    return newItemId;
  }

  /// @dev Returns an URI for a given token ID
  function _baseURI() internal view virtual override returns (string memory) {
    return baseTokenURI;
  }

  /// @dev Sets the base token URI prefix.
  function setBaseTokenURI(string memory _baseTokenURI) public {
    baseTokenURI = _baseTokenURI;
  }

  function safeTransferFrom(address from, address to, uint256 tokenId) public override {
    revert("safeTransferFrom(address from, address to, uint256 tokenId): cannot transfer token");
  }

  function safeTransferFrom(address from, address to, uint256 tokenId, bytes memory _data) public override {
    revert("safeTransferFrom(address from, address to, uint256 tokenId, bytes _data): cannot transfer token");
  }

  function transferFrom(address from, address to, uint256 tokenId) public override {
    revert("transferFrom(): cannot transfer token");
  }

}