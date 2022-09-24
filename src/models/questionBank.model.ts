import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class QuestionBank {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column()
  question: string

  @Column()
  sql: string
}
