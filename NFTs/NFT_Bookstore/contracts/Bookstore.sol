pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract BookStore is ERC1155 {
    struct BookDetails {
        address author;
        string title;
        uint256 copies;
    }

    mapping(uint256 => BookDetails) private _BookDetails;

    uint256 public tokenCounter;

    constructor() ERC1155 ("https://") {
        tokenCounter = 0;
    }

    // Mints a book NFT
    function publish(string memory _title, uint256 _copies) public {
        uint256 newTokenId = tokenCounter + 1;
        _BookDetails[newTokenId].author = msg.sender;
        _BookDetails[newTokenId].title = _title;
        _BookDetails[newTokenId].copies = _copies;

        _mint(msg.sender, newTokenId, _copies, ""); // Internal virtual function of ERC1155 _mint(owner, tokenId, quantity, callback data of type bytes)
        tokenCounter += 1;
    }

    // Getters
    function getTitle(uint256 BookId) public view returns (string memory) {
        return (_BookDetails[BookId].title);
    }

    function getCopies(uint256 BookId) public view returns (uint256) {
        return (_BookDetails[BookId].copies);
    }

    function getAuthor(uint256 BookId) public view returns (address) {
        return (_BookDetails[BookId].author);
    }

    // Approve Transfer of Tokens from Author
    function approve(address operator) public {
        require(operator != msg.sender);

        setApprovalForAll(operator, true); // Approves transfer of tokens
    }

    // Purchase Tokens
    function purchase(uint256 tokenId, uint256 _copies) public {
        safeTransferFrom(_BookDetails[tokenId].author, msg.sender, tokenId, _copies, ""); // Transfers ownership of token
    }
}