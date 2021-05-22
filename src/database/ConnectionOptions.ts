import { ConnectionOptions } from "typeorm";

const cli = {
	entitiesDir: './src/entities',
	migrationsDir: './src/database/migrations',
}

const sqliteDatabase = {
	type: 'sqlite',
	database: './src/database/data.sqlite',
}

const commonDevelopmentConfig = {
	logging: true,
	synchronize: false,
	entities: [
		'./dist/entities/**/*.entity{.ts,.js}'
	],
	entitySchemas: [
		'./dist/schemas/**/*.schema{.ts,.js}'
	],
	migrations: [
		'./dist/database/migrations/*'
	],
	cli
};

const cliConfig = {
	...sqliteDatabase,
	logging: true,
	entities: [
		'./src/entities/**/*.entity{.ts,.js}'
	],
	entitySchemas: [
		'./src/schemas/**/*.schema{.ts,.js}'
	],
	migrations: [
		'./src/database/migrations/*'
	],
	cli
};

const testConfig = {
	type: 'sqlite',
	database: ':memory:',
	logging: true,
	entities: [
		'./src/entities/**/*.entity{.ts,.js}'
	],
	entitySchemas: [
		'./src/schemas/**/*.schema{.ts,.js}'
	],
	migrations: [
		'./src/database/migrations/*'
	],
	cli
}

const developmentConfig = {
	...commonDevelopmentConfig,
	...sqliteDatabase
}

const dockerDevelopmentConfig = {
	...commonDevelopmentConfig,
	type: 'postgres',
	host: 'postgresdb_service',
	port: 5432,
	username: 'postgres-user',
	password: 'postgres-dev-pass',
	database: 'development_db',
	migrationsRun: true,
}

const productionConfig = {
	name: 'production',
	type: 'postgres',
	host: process.env.POSTGRES_HOST ?? 'my-host',
	port: process.env.POSTGRES_PORT ?? 5432,
	username: process.env.POSTGRES_USER ?? 'postgress',
	password: process.env.POSTGRES_PASSWORD ?? 'password-post',
	database: process.env.POSTGRES_DATABASE ?? 'main_database',
	migrationsRun: false,
	synchronize: false,
	dropSchema: false,
	logging: false,
	entities: [
		'./dist/entities/**/*.entity{.ts,.js}'
	],
	entitySchemas: [
		'./dist/schemas/**/*.schema{.ts,.js}'
	],
	migrations: [
		'./dist/database/migrations/*'
	],
	cli: {
		entitiesDir: './src/entities',
		migrationsDir: './src/database/migrations',
	}
}


let exportedConfig;

switch (process.env.NODE_ENV) {
	case 'production':
		exportedConfig = productionConfig;
		break;

	case 'docker_development':
		exportedConfig = dockerDevelopmentConfig;
		break;

	case 'cli':
		exportedConfig = cliConfig;
		break;

	case 'test':
		exportedConfig = testConfig;
		break;

	default:
		exportedConfig = developmentConfig;
}

console.log(exportedConfig);

export default exportedConfig as ConnectionOptions;
