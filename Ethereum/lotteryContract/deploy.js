const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const { interface, bytecode } = require("./compile");
const mnemonic = require("./secrets/mnemonic");

//Set up HD Wallet Provider, specifies account and node connection
const provider = new HDWalletProvider(
    mnemonic,
    "https://rinkeby.infura.io/v3/34feb9723d5448ed98ce1abc279d197a"
);

//Generates an instance of Web3 connected to Rinkeby network
const web3 = new Web3(provider);

//Deploy Contract to Rinkeby
const deploy = async () => {
    try {
        //GET - list of accounts
        const accounts = await web3.eth.getAccounts();
        console.log(`Attempting to deploy from ${accounts[0]}`);

        const result = await new web3.eth.Contract(JSON.parse(interface))
            .deploy({ data: "0x" + bytecode })
            .send({ from: accounts[0] });

        console.log(`Contract deployed to: ${result.options.address}`);
    } catch (e) {
        console.log(e);
    }
};

deploy();
