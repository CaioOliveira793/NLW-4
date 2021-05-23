import { createConnection, Connection } from 'typeorm';
import { providers } from '../constants';

import ormConfig from './connections';

export const DatabaseProvider = {
	provide: providers.databaseConnection,
	useFactory: async (): Promise<Connection> => await createConnection(ormConfig),
};
