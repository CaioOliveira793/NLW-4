import { createConnections, Connection } from 'typeorm';
import { providers } from '../constants';

export const DatabaseProvider = {
	provide: providers.databaseConnection,
	useFactory: async (): Promise<Connection[]> => await createConnections(),
};
