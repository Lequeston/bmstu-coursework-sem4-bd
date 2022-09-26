import logger from '../../config/logger';
import { readFileSync, writeFileSync } from "fs";

import { QuestionBank } from '../../models/questionBank.model';
import { Question } from '../../types';

export class QuestionBankService {
  public async createMoodleBank(filepath: string): Promise<boolean> {
    let moodleBank: string = "$CATEGORY: $course$/top/По умолчанию для Базы данных/SQL\n\n";
    try {
      const questions: QuestionBank[] = await QuestionBank.find();
      questions.forEach(question => {
        moodleBank = `${moodleBank}::${question.name}::${question.text}{}\n\n`;
      });
      writeFileSync(filepath, moodleBank);
      return true;
    } catch(err) {
      logger.error(err);
      return false
    }
  }

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
    const file: string = readFileSync(`${__dirname}/../../assets/questions.json`, 'utf8');
    const questions: Question[] = await JSON.parse(file);
    return await this.addQuestions(questions);
  }
}
