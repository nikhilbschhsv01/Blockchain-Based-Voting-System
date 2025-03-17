const { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } = require("typeorm");
const { Poll } = require("./Poll");

@Entity()
class Candidate extends BaseEntity {
  @PrimaryGeneratedColumn()
  id;

  @Column()
  name;

  @ManyToOne(() => Poll, (poll) => poll.candidates)
  poll;
}

module.exports = { Candidate };
