const { User } = require("../../entity/User");
const yup = require("yup");

const schema = yup.object({
  body: yup.object({
    userId: yup.number().integer().required(),
  }),
});

module.exports = async (req, res) => {
  try {
    await schema.validate(req);
  } catch (error) {
    return res.status(400).send(error.errors);
  }

  let user;

  try {
    user = await User.findOneOrFail({ where: { id: req.body.userId } });
  } catch (error) {
    return res.status(400).send({ error });
  }

  user.verified = true;

  await User.save(user);

  return res.send({ user });
};
