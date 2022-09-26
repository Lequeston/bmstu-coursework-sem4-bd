import logger from '../../config/logger';
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

  public async updateQuestions(): Promise<boolean> {
    await QuestionBank.clear();
    const file: string = await readFile(`${__dirname}/../../src/libs/questions.json`, 'utf8');
    let questions: Question[] = [];
    try {
      questions = await JSON.parse(file);
    } catch(err) {
      logger.error(err);
    }
    return await this.addQuestions(questions);
  }
}
