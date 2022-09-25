import 'dotenv/config';

import logger from './config/logger';
import sqlTestService from './service/SQLTestService';

logger.info(process.pid);

const start = async () => {
  try {
    logger.info("Hello, world");
    const res = await sqlTestService.compare('SELECT FirstName, LastName FROM Customers', 'SELECT FirstName, LastName FROM Employees');
    logger.info(res);
    const res2 = await sqlTestService.compare('SELECT FirstName, LastName FROM Customers', 'SELECT FirstName, LastName FROM Customers');
    logger.info(res2);
  } catch(e) {
    logger.error(e);
  }
}

start();
