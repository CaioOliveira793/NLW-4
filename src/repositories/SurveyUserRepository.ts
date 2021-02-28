import { Connection, Repository } from 'typeorm';
import { SurveyUser } from 'src/entities/SurveyUser.entity';
import { providers } from '../constants';

export const surveyUserRepository = {
	provide: providers.surveyUserRepository,
	useFactory: (connection: Connection): Repository<SurveyUser> => connection.getRepository(SurveyUser),
	inject: [providers.databaseConnection],
};
