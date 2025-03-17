const { BaseEntity, Column, Entity, PrimaryGeneratedColumn } = require("typeorm");

@Entity()
class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id;

  @Column({ length: 100 })
  name;

  @Column({ unique: true })
  citizenshipNumber;

  @Column({ length: 180, unique: true })
  email;

  @Column()
  password;

  @Column()
  admin;

  @Column({ default: false })
  verified;
}

module.exports = { User };
