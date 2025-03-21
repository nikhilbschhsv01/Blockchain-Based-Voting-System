const ElectionContract = require("../../web3");
const { web3 } = require("../../web3");
const yup = require("yup");

const checkSchema = yup.object({
  body: yup.object({
    id: yup.string().required(),
  }),
});

const checkVoteability = async (req, res) => {
  try {
    await checkSchema.validate(req);
  } catch (error) {
    return res.status(400).send({ error });
  }

  const instance = await ElectionContract.deployed();
  const voters = await instance.getVoters();
  const status = await instance.getStatus();

  if (status !== "running") return res.status(400).send("election not running");
  if (voters.includes(req.body.id)) return res.send("already-voted");

  return res.send("not-voted");
};

module.exports.checkVoteability = checkVoteability;

const schema = yup.object({
  body: yup.object({
    id: yup.string().required(),
    name: yup.string().min(3).required(),
    candidate: yup.string().min(3).required(),
  }),
});

const voteController = async (req, res) => {
  try {
    await schema.validate(req);
  } catch (error) {
    return res.status(400).send(error.errors);
  }

  const accounts = await web3.eth.getAccounts();
  const instance = await ElectionContract.deployed();
  const voters = await instance.getVoters();
  const candidates = await instance.getCandidates();

  if (voters.includes(req.body.id))
    return res.status(400).send("already voted");

  if (!candidates.includes(req.body.candidate))
    return res.status(400).send("no such candidate");

  await instance.vote(req.body.id, req.body.name, req.body.candidate, {
    from: accounts[0],
  });

  return res.send("successful");
};

module.exports.default = voteController;
