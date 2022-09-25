import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm'

@Entity('question_bank')
export class QuestionBank extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  question_name: string

  @Column()
  question_text: string

  @Column()
  sql: string
}
