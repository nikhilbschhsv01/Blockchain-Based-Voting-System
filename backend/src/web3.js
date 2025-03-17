const Web3 = require("web3");
const data = require("../build/contracts/Election.json");

const web3 = new Web3("http://127.0.0.1:7545");

const provider = new Web3.providers.HttpProvider("http://127.0.0.1:7545");
const contract = require("@truffle/contract");

const ElectionContract = contract(data);

ElectionContract.setProvider(provider);

module.exports = ElectionContract;
