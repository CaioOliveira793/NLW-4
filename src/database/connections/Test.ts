import { ConnectionOptions } from 'typeorm';

export const testConfig = {

	type: 'sqlite',
	database: ':memory:',

	logging: true,

	entities: ['./src/entities/**/*.entity{.ts,.js}'],
	entitySchemas: ['./src/schemas/**/*.schema{.ts,.js}'],
	migrations: ['./src/database/migrations/*'],

	entitiesDir: './src/entities',
	migrationsDir: './src/database/migrations',

} as ConnectionOptions;
