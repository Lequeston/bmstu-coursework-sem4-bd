import logger from '../../config/logger';
import { getConnection } from "typeorm";
import { readFile } from "fs/promises";

import { QuestionBank } from '../../models/questionBank.model';
import { Question } from '../../types';

export class QuestionBankService {
  public async addQuestion(question: Question): Promise<boolean> {
    try {
      await QuestionBank.create(question).save();
      return true;
    } catch(err) {
      logger.error(err);
      return false;
    }
  }

  public async addQuestions(questions: Question[]): Promise<boolean> {
    for (const question of questions)
      if (!await this.addQuestion(question))
        return false;
    return true;
    
  }

  public async update(): Promise<boolean> {
    await QuestionBank.clear();
    const file: string = await readFile(`${process.env.PROJECT_ROOT}/src/libs/questions.json`, 'utf8');
    const questions: Question[] = await JSON.parse(file);
    return await this.addQuestions(questions);
  }
}
