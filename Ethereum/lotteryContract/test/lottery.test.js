const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const { interface, bytecode } = require("../compile");

//Instance of Web3
const web3 = new Web3(ganache.provider());

let lottery;
let accounts;

beforeEach(async function() {
    accounts = await web3.eth.getAccounts();

    lottery = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode })
        .send({ from: accounts[0], gas: "1000000" });
});

describe("Lottery", function() {
    it("deploys a contract", function() {
        assert.ok(lottery.options.address);
    });

    it("allows one account to enter", async function() {
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei(".02", "ether")
        });

        const players = await lottery.methods
            .getPlayers()
            .call({ from: accounts[0] });

        assert.equal(1, players.length);
        assert.equal(accounts[0], players[0]);
    });

    it("allows multiple accounts to enter", async function() {
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei(".02", "ether")
        });

        await lottery.methods.enter().send({
            from: accounts[1],
            value: web3.utils.toWei(".02", "ether")
        });

        const players = await lottery.methods
            .getPlayers()
            .call({ from: accounts[0] });

        assert.equal(2, players.length);
        assert.equal(accounts[0], players[0]);
        assert.equal(accounts[1], players[1]);
    });
});
