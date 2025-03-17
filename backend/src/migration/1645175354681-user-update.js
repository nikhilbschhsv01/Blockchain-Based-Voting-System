module.exports = class userUpdate1645175354681 {
    name = 'userUpdate1645175354681'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`verified\` tinyint NOT NULL DEFAULT 0`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`verified\``);
    }
};
