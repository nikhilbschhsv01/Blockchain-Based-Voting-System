const { User } = require("../../entity/User");

module.exports = async (req, res) => {
  const { id } = req.params;

  if (!id) return res.status(400).send("no id found");

  try {
    await User.delete(id);
  } catch (error) {
    return res.status(400).send({ error });
  }

  return res.send({ userId: id });
};
