import 'dotenv/config';
import 'reflect-metadata';

import { connection } from './libs/db';
import logger from './config/logger';

import QuestionBankService from './services/QuestionBankService';

logger.info(process.pid);

const start = async () => {
  try {
    await connection.connect();
    const done = await QuestionBankService.addQuestion(
      'SQL Главные по работам  зарабатывающие больше, чем их начальник отдела',
      '[html]<p>Найти главных по работам получающие заработную плату большую,\nчем их начальник отдела<br></p>',
      'SOME_SQL_CODE'
    );
    console.log(`${done}`);
    await connection.close();
  } catch(e) {
    logger.error(e);
  }
}

start();
