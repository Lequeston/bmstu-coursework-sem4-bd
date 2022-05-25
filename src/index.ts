import 'dotenv/config';

import logger from './config/logger';

logger.info(process.pid);

const start = async () => {
  try {
    logger.info("Hello, world");
  } catch(e) {
    logger.error(e);
  }
}

start();
