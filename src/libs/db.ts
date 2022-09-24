import { Pool } from 'pg';
import { getConnectionManager } from 'typeorm';

import QuestionBankService from '../service/QuestionBankService';

import logger from '../config/logger';

export const pool = new Pool({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST || '',
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5432', 10),
});

pool.on('error', (err, _) => {
  logger.error(err);
});

const connectionManager = getConnectionManager();
export const connection = connectionManager.create({
  name: 'default',
  type: 'postgres',
  host: process.env.DB_HOST || '',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  entities: [
    QuestionBankService
  ],
  logging: false
});
