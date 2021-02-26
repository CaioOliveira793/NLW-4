import { Connection, Repository } from 'typeorm';
import { User } from '../entities/User.entity';
import { providers } from '../constants';

export const userRepository = {
	provide: providers.userRepository,
	useFactory: (connection: Connection): Repository<User> => connection.getRepository(User),
	inject: [providers.databaseConnection],
};
