import { ConnectionOptions } from 'typeorm';

export const developmentConfig = {

	type: 'sqlite',
	database: './src/database/data.sqlite',

	logging: true,
	synchronize: false,

	entities: ['./dist/src/entities/**/*.entity{.ts,.js}'],
	entitySchemas: ['./dist/src/schemas/**/*.schema{.ts,.js}'],
	migrations: ['./dist/src/database/migrations/*'],

	entitiesDir: './src/entities',
	migrationsDir: './src/database/migrations',

} as ConnectionOptions;
