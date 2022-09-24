import 'dotenv/config';

import logger from './config/logger';
import sqlTestService from './service/SQLTestService';

logger.info(process.pid);

const start = async () => {
  try {
    logger.info("Hello, world");
    const res = await sqlTestService.compare('SELECT FirstName, LastName FROM Customers', 'SELECT FirstName, LastName FROM Employees');
    logger.info(res);
  } catch(e) {
    logger.error(e);
  }
}

start();
