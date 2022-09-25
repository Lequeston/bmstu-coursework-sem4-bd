import { SQLTestService } from './SQLTest.service';
import { pool } from '../../libs/db';

export default new SQLTestService(pool);