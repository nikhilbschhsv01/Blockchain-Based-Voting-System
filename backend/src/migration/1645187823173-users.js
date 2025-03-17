const { User } = require("../entity/User");
const usersData = require("../seed/users");

module.exports = class users1645187823173 {
    name = 'users1645187823173'

    async up(queryRunner) {
        const users = User.create(usersData);
        await User.save(users);
    }

    async down(queryRunner) {}
};
