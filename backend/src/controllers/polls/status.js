const ElectionContract = require("../../web3");

module.exports = async (_, res) => {
  const instance = await ElectionContract.deployed();

  const status = await instance.getStatus();

  return res.send({ status });
};
