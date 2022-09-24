import { Pool } from 'pg';
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