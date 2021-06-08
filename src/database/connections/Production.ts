import { ConnectionOptions } from "typeorm";

export const productionConfig = {

	name: 'production',
	type: 'postgres',
	host: process.env.POSTGRES_HOST,
	port: Number.parseInt(process.env.POSTGRES_PORT as string),
	username: process.env.POSTGRES_USER,
	password: process.env.POSTGRES_PASSWORD,
	database: process.env.POSTGRES_DATABASE,

	migrationsRun: false,
	synchronize: false,
	dropSchema: false,
	logging: false,

	entities: ['./dist/src/entities/**/*.entity{.ts,.js}'],
	entitySchemas: ['./dist/src/schemas/**/*.schema{.ts,.js}'],
	migrations: ['./dist/src/database/migrations/*'],

	cli: {
		entitiesDir: './src/entities',
		migrationsDir: './src/database/migrations',
	}

} as ConnectionOptions;
