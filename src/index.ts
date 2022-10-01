import 'dotenv/config';
import 'reflect-metadata';

import logger from './config/logger';

import { connection } from './libs/db';

import QuestionBankService from './services/QuestionBankService';
import SQLTestService from './services/SQLTestService';

import { Answer, ResultCompare } from './types';

logger.info(process.pid);

const start = async () => {
  try {
    await connection.connect();

    await QuestionBankService.updateQuestions(`/home/fummie/Downloads/bank.json`) ?
      logger.info('Questions are updated') :
      logger.error('Error on question update');

    await QuestionBankService.createMoodleBank(`/home/fummie/Downloads/moodle.txt`) ?
      logger.info('Blank for Moodle question bank is created') :
      logger.error('Error on creating Moodle question bank blank');

    //Распарсим ответы
    let answers: Answer[] = QuestionBankService.parseMoodleAnswers(`/home/fummie/Downloads/moodle.json`);

    //Отфильтруем все ответы с вариантом выбора
    answers = answers.filter(answer => answer.rightAnswer === '-')

    //Проверим все ответы
    for (const answer of answers) {
      console.log(answer);
      console.log(
        await SQLTestService.compare(
          answer.answer,
          await QuestionBankService.getSQL(answer.question)
        )
      );
      console.log("\n");
    }

    await connection.close();
  } catch(e) {
    logger.error(e);
  }
}

start();
