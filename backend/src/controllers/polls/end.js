const { web3 } = require("../../web3");
const ElectionContract = require("../../web3").default;
const memoryCache = require("memory-cache");

module.exports = async (_, res) => {
  const accounts = await web3.eth.getAccounts();
  const instance = await ElectionContract.deployed();

  const status = await instance.getStatus();

  if (status !== "running") return res.status(400).send("election not started");

  await instance.endElection({ from: accounts[0] });

  const votes = await instance.getVotes();

  memoryCache.clear();

  return res.send({ votes });
};
