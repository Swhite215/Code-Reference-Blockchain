const Bookstore = artifacts.require("./Bookstore.sol");

module.exports = async function(deployer) {
    await deployer.deploy(Bookstore);
    const bookstoreContract = await Bookstore.deployed();
    const bookstoreAddress = bookstoreContract.address;
}