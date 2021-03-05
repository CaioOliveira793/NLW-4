import { Connection, Repository } from 'typeorm';
import { Answer } from 'src/entities/Answers.entity';
import { providers } from '../constants';

export const answerRepository = {
	provide: providers.answerRepository,
	useFactory: (connection: Connection): Repository<Answer> => connection.getRepository(Answer),
	inject: [providers.databaseConnection],
};
