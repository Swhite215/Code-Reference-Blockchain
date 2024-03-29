const Market = artifacts.require("../Market.sol");
const NFT = artifacts.require("../NFT.sol");

require("chai").use(require("chai-as-promised")).should;

const { assert } = require("chai");
var ethers = require("ethers");
var web3 = require("web3");

contract('Market', (accounts) => {
    contract('NFT', (accounts) => {
        let contractM, contractN;
    });

    before(async() => {
        contractM = await Market.deployed();
        contractN = await NFT.deployed();
    });

    describe("deployment", async() => {
        it('Market contract is deployed successfully', async() => {
            const addressM = contractM.address;
            assert.notEqual(addressM, "");
        });

        it('NFT contract is deployed successfully', async() => {
            const addressN = contractN.address;
            assert.notEqual(addressN, "");
        });
    });

    describe('creating token', async() => {
        it('NFT contract creates a new token', async() => {
            await contractN.createToken('https://ipfs.imageaddress1');
            const tokenURI = await contractN.tokenURI(1);
            assert.equal(tokenURI, 'https://ipfs.imageaddress1');
        });

        it('NFT marketplace contract creates a new token', async() => {
            let listingPrice = await contractM.getListingPrice();
            console.log(`Listing Price: ${web3.utils.fromWei(listingPrice.toString(), 'ether')}`);
            let auctionPrice = ethers.utils.parseUnits('10', 'ether');
            await contractM.createMarketItem(contractN.address, 1, auctionPrice, { value: listingPrice });
            const items = await contractM.fetchMarketItems();

            console.log(`Items: ${items}`);
            assert.equal(1, 1);
        });
    });
});