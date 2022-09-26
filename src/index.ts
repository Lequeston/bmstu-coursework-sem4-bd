import 'dotenv/config';
import 'reflect-metadata';

import { connection } from './libs/db';
import logger from './config/logger';

import QuestionBankService from './services/QuestionBankService';

logger.info(process.pid);

const start = async () => {
  try {
    await connection.connect();
    //console.log(await QuestionBankService.updateQuestions() ? "success": "failure");
    //console.log(await QuestionBankService.createMoodleBank(`/home/fummie/Downloads/moodle.txt`) ? "success": "failure");
    console.log(QuestionBankService.parseMoodleAnswers(`/home/fummie/Downloads/moodle.json`))
    await connection.close();
  } catch(e) {
    logger.error(e);
  }
}

start();
