const assert = require("assert");
const ganache = require("ganache-cli"); //Automatically creates unlocked example accounts
const Web3 = require("web3"); //Constructor Function = Capital
const { interface, bytecode } = require("../compile"); //Deconstruct interface and bytecode from compiled contract

//Set up instance of Web3 with Ganache network provider
const provider = ganache.provider();
const web3 = new Web3(provider);

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

  //Add Provider to Inbox
  inbox.setProvider(provider);
});

//Testing
describe("Inbox", function() {
  it("deploys a contract", () => {
    assert.ok(inbox.options.address); //Checks there is an existing address
  });

  //Example test where a method is being called
  it("has a default message", async function() {
    let message = await inbox.methods.message().call();
    assert.equal(message, "Hi there!");
  });

  //Example test where a transaction is being sent
  it("can change the message", async function() {
    await inbox.methods.setMessage("New Message").send({ from: accounts[0] });
    let message = await inbox.methods.message().call();

    assert.equal(message, "New Message");
  });
});
