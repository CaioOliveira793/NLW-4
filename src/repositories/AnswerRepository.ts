import { Connection, Repository } from 'typeorm';
import { Answers } from 'src/entities/Answers.entity';
import { providers } from '../constants';

export const answerRepository = {
	provide: providers.answerRepository,
	useFactory: (connection: Connection): Repository<Answers> => connection.getRepository(Answers),
	inject: [providers.databaseConnection],
};
