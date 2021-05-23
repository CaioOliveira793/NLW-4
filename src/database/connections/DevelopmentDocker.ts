import { ConnectionOptions } from "typeorm";

export const developmentDockerConfig = {

	type: 'postgres',
	host: 'postgresdb_service',
	port: 5432,
	username: 'postgres-user',
	password: 'postgres-dev-pass',
	database: 'development_db',

	migrationsRun: true,
	logging: true,
	synchronize: false,

	entities: ['./dist/src/entities/**/*.entity{.ts,.js}'],
	entitySchemas: ['./dist/src/schemas/**/*.schema{.ts,.js}'],
	migrations: ['./dist/src/database/migrations/*'],

	cli: {
		entitiesDir: './src/entities',
		migrationsDir: './src/database/migrations',
	},

} as ConnectionOptions;
