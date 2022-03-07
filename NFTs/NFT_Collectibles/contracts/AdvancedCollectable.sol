pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol"; // Extension to ERC721 Token, Use it to Set Token URIs to Save files
import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";

contract AdvancedCollectable is ERC721URIStorage, VRFConsumerBase {

    bytes32 internal keyhash;
    uint256 public fee;
    uint256 tokenCounter;

    mapping(bytes32 => address) requestIdToSender;
    mapping(bytes32 => string) requestIdToTokenURI;
    mapping(uint256 => Breed) tokenIdToBreed;
    mapping(bytes32 => uint256) requestIdToTokenId;

    event requestCollectable(bytes32 indexed requestId);

    enum Breed{PUG, Shiba, Hound} 

    constructor(address _VRFCoordinator, address _LinkToken, bytes32 _keyhash) VRFConsumerBase(_VRFCoordinator, _LinkToken), ERC721("Doggie", "Dog") {
        fee = 0.1 * 10 ** 0;
        keyhash = _keyhash;
        tokenCounter = 0;
    }

    function createCollectable(string memory tokenURI) public returns (bytes32) {
        bytes32 requestId = requestRandomness(keyhash, feee);
        requestIdToSender[requestId] = msg.sender;
        requestIdToTokenURI[requestId] = tokenURI;

        emit requestedCollectable(requestId);
    }

    function fulfilRandomness(bytes32 requestId, uint256 randomNumber) internal override {
        address dogOnwer = requestIdToSender[requestId];
        string tokenURI = requestIdToTokenURI[requestId];
        uint256 newItemId = tokenCounter;

        _safeMint(dogOwner, newItemId);

        Breed breed = Breed(randomNumber % 3);
        tokenIdToBreed[newItemId] = breed;
    }

    function setTokenURI(string memory _tokenURI, uint256 _tokenId) public {
        require(
            isApprovedOrOwner(_msgSender(), tokenId), "ERC721: transfer caller is not owner"
        )

        _setTokenURI(_tokenId, _tokenURI);
    }
}