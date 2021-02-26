import { Connection, Repository } from 'typeorm';
import { Survey } from '../entities/Survey.entity';
import { providers } from '../constants';

export const surveyRepository = {
	provide: providers.surveyRepository,
	useFactory: (connection: Connection): Repository<Survey> => connection.getRepository(Survey),
	inject: [providers.databaseConnection],
};
