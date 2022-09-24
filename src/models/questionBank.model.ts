import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class QuestionBank {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  question: string

  @Column()
  sql: string
}
