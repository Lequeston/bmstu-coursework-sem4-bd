import { Pool } from "pg";
import { ResultCompare } from "../../types";

export class SQLTestService {
  private dbClient: Pool;

  constructor(dbClient: Pool) {
    this.dbClient = dbClient;
  }

  public async compare(sqlA: string, sqlB: string): Promise<ResultCompare> {
    const client = await this.dbClient.connect();
    try {
      const res = await client.query(`
        ${sqlA}
        EXCEPT
        ${sqlB}
      `);
      client.release();
      if (res.rowCount === 0) {
        return {
          err: null,
          success: true,
          difference: null
        }
      } else {
        console.log(res.rows);
        return {
          err: null,
          success: false,
          difference: res.rows.join('\n'),
        }
      }
    } catch (err: any) {
      client.release();
      return {
        err: err,
        success: false,
        difference: null,
      }
    }
  }
}