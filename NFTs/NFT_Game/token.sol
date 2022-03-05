// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
import 'https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import 'https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol';

contract Token is ERC721URIStorage, Ownable {
    uint256 tokenCounter = 0;

    struct Pet {
        uint256 damage;
        uint256 endurance;
    }

    mapping(uint256 => Pet) private tokenDetails;

    constructor(string memory name, string memory symbol) ERC721(name, symbol) {

    }

    function mint(uint256 damage, uint256 endurance) public onlyOwner {
        uint256 newId = tokenCounter;

        tokenDetails[newId] = Pet(damage, endurance);
        _safeMint(msg.sender, newId);

        tokenCounter++;
    }

    function Damage(uint256 tokenId) public view returns(uint256) {
        return tokenDetails[tokenId].damage;
    }

    function Endurance(uint256 tokenId) public view returns(uint256) {
        return tokenDetails[tokenId].endurance;
    }

    function Feed(uint256 tokenId) public {
        Pet storage pet = tokenDetails[tokenId];
        // Feed Pet
        pet.endurance = 100;
    }
}