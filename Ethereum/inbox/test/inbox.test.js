const assert = require("assert");
const ganache = require("ganache-cli"); //Automatically creates unlocked example accounts
const Web3 = require("web3"); //Constructor Function = Capital
const { interface, bytecode } = require("../compile"); //Deconstruct interface and bytecode from compiled contract

//Set up instance of Web3 with Ganache network provider
const web3 = new Web3(ganache.provider());

//Test Preparation
let accounts;
let inbox;

beforeEach(async () => {
  // GET - list of all accounts
  accounts = await web3.eth.getAccounts();

  // Use an account to deploy contract
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ["Hi there!"] })
    .send({ from: accounts[0], gas: "1000000" });
});

//Testing
describe("Inbox", function() {
  it("deploys a contract", () => {
    console.log(inbox);
  });
});
