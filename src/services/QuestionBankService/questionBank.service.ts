import logger from '../../config/logger';
import { readFileSync, writeFileSync } from "fs";

import { QuestionBank } from '../../models/questionBank.model';
import { Answer, Question } from '../../types';

export class QuestionBankService {
  public async getSQL(text: string): Promise<string> {
    const response: QuestionBank | undefined = await QuestionBank.findOne({text});
    if (response)
      return response.sql
    logger.error('Cant find SQL by text in Question bank');
    return '';
}

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

  public parseMoodleAnswers(filepath: string): Answer[] {
    const answers: Answer[] = []
    const file: string = readFileSync(filepath, 'utf8');
    const moodleAnswers: string[][][] = JSON.parse(file);

    moodleAnswers[0].forEach(element => {
      const studentInfo: string[] = element.splice(0, 13);
      const student: string = `${studentInfo[0]} ${studentInfo[1]} ${studentInfo[3]}`
      for (let i: number = 0; i < element.length; i+=3) {
        answers.push({
          student,
          question: element[i],
          answer: element[i+1],
          rightAnswer: element[i+2]
        })
      }
    });
    return answers;
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
