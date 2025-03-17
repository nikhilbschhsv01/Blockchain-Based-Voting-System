const yup = require("yup");
const ElectionContract = require("../../web3");
const { web3 } = require("../../web3");

const schema = yup.object({
  body: yup.object({
    name: yup.string().min(3).required(),
    description: yup.string().min(10).required(),
    candidates: yup.array(
      yup.object({
        name: yup.string().min(3),
        info: yup.string().min(10),
      })
    ),
  }),
});

module.exports = async (req, res) => {
  try {
    await schema.validate(req);
  } catch (error) {
    return res.status(400).send(error.errors);
  }

  const instance = await ElectionContract.deployed();

  const status = await instance.getStatus();
  if (status !== "not-started")
    return res.status(400).send("election already started or not reset");

  const accounts = await web3.eth.getAccounts();

  await instance.setElectionDetails(req.body.name, req.body.description, {
    from: accounts[0],
  });

  for (let i = 0; i < req.body.candidates.length; i++) {
    const candidate = req.body.candidates[i];
    await instance.addCandidate(candidate.name, candidate.info, {
      from: accounts[0],
    });
  }

  return res.send(req.body);
};
