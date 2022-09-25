import 'dotenv/config';
import 'reflect-metadata';

import logger from './config/logger';
import { pool } from './libs/db';

logger.info(process.pid);

const start = async () => {
  try {
    logger.info("Hello, world");
    const client = await pool.connect();
    const res = await client.query('SELECT * FROM test');
    logger.info(res.rows);
    logger.info(res.fields);
    logger.info(res.command);
  } catch(e) {
    logger.error(e);
  }
}

start();
