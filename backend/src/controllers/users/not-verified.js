const { User } = require("../../entity/User");

module.exports = async (req, res) => {
  const users = await User.find({
    select: ["id", "name", "citizenshipNumber", "email"],
    where: { verified: false },
  });

  return res.send({ users });
};
