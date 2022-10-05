import 'dotenv/config';
import 'reflect-metadata';

import logger from './config/logger';
import program from './libs/cli';

import { connection } from './libs/db';

logger.info(process.pid);

const start = async () => {
  try {
    await connection.connect();
    program.parse();
    await connection.close();
  } catch(e) {
    logger.error(e);
  }
}

start();
