const ElectionContract = require("../../web3");
const { web3 } = require("../../web3");

module.exports = async (_, res) => {
  const accounts = await web3.eth.getAccounts();
  const instance = await ElectionContract.deployed();

  const status = await instance.getStatus();

  if (status !== "finished")
    return res.status(400).send("election not finished or already reset");

  await instance.resetElection({ from: accounts[0] });

  return res.send("successful");
};
