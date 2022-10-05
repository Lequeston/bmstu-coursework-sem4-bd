import { Command } from 'commander';
import logger from '../config/logger';

const program = new Command();

import questionBankService from '../services/QuestionBankService';
import SQLTestService from '../services/SQLTestService';
import { Answer } from '../types';

program
  .name('bmstu-courswork-sem4-bd')
  .version('1.0.0');

program.command('update')
  .argument('<string>', 'файл для чтения')
  .action(async (str) => {
    await questionBankService.updateQuestions(str) ?
      logger.info('Questions are updated') :
      logger.error('Error on question update');
  });

program.command('generate')
  .argument('<string>', 'файл для чтения')
  .action(async (str) => {
    await questionBankService.createMoodleBank(str) ?
      logger.info('Blank for Moodle question bank is created') :
      logger.error('Error on creating Moodle question bank blank');
  });

program.command('check')
  .argument('<string>', 'файл для чтения')
  .action(async (str) => {
    let answers: Answer[] = questionBankService.parseMoodleAnswers(str);

    //Отфильтруем все ответы с вариантом выбора
    answers = answers.filter(answer => answer.rightAnswer === '-')

    //Проверим все ответы
    for (const answer of answers) {
      console.log(answer);
      console.log(
        await SQLTestService.compare(
          answer.answer,
          await questionBankService.getSQL(answer.question)
        )
      );
      console.log("\n");
    }
  });

export default program;