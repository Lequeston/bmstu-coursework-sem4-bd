import 'dotenv/config';
import 'reflect-metadata';

import { connection } from './libs/db';
import logger from './config/logger';

import QuestionBankService from './services/QuestionBankService';

logger.info(process.pid);

const start = async () => {
  try {
    await connection.connect();
    console.log(await QuestionBankService.update() ? "success": "failure");
    await connection.close();
  } catch(e) {
    logger.error(e);
  }
}

start();
