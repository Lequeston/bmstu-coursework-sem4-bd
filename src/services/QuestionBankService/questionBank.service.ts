import logger from '../../config/logger';
import { QuestionBank } from '../../models/questionBank.model';
export class QuestionBankService {
  public async addQuestion(questionName: string, questionText: string, sql: string): Promise<boolean> {
    const questionRecord = QuestionBank.create({
      question_name: questionName,
      question_text: questionText,
      sql
    });
    try {
      await questionRecord.save();
      return true;
    } catch(err) {
      logger.error(err);
      return false;
    }
  }
}
