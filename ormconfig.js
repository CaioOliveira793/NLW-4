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
		'./dist/src/entities/**/*.entity{.ts,.js}'
	],
	entitySchemas: [
		'./dist/src/schemas/**/*.schema{.ts,.js}'
	],
	migrations: [
		'./dist/src/database/migrations/*'
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


let exportedConfig;

switch (process.env.NODE_ENV) {
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

module.exports = exportedConfig;
