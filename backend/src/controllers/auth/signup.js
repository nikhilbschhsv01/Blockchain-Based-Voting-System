const yup = require("yup");
const { User } = require("../../entity/User");
const bcrypt = require("bcrypt");

const schema = yup.object({
  body: yup.object({
    name: yup.string().min(3).required(),
    email: yup.string().email().required(),
    password: yup.string().min(3).required(),
    citizenshipNumber: yup.string().min(4),
  }),
});

module.exports = async (req, res) => {
  try {
    await schema.validate(req);
  } catch (error) {
    return res.status(400).send(error.errors);
  }

  let hashedPassword;

  try {
    hashedPassword = await bcrypt.hash(req.body.password, 10);
  } catch (error) {
    return res.status(500).send({ error });
  }

  const newUser = new User();

  newUser.admin = false;
  newUser.name = req.body.name;
  newUser.email = req.body.email;
  newUser.password = hashedPassword;
  newUser.citizenshipNumber = req.body.citizenshipNumber;

  try {
    await User.save(newUser);
  } catch (error) {
    return res.status(400).send(error);
  }

  return res.send(newUser);
};
