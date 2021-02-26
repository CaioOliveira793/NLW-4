const commonDevelopmentConfig = {
	logging: true,
	synchronize: false,
	entities: [
		'./dist/src/entities/*.entity{.ts,.js}'
	],
	entitySchemas: [
		'./dist/src/schemas/*.schema{.ts,.js}'
	],
	migrations: [
		'./dist/src/database/migrations/*'
	],
	cli: {
		entitiesDir: './src/entities',
		migrationsDir: './src/database/migrations',
	}
};


const cliConfig = {
	type: 'sqlite',
	database: './src/database/data.sqlite',
	logging: true,
	entities: [
		'./src/entities/*.entity{.ts,.js}'
	],
	entitySchemas: [
		'./src/schemas/*.schema{.ts,.js}'
	],
	migrations: [
		'./src/database/migrations/*'
	],
	cli: {
		entitiesDir: './src/entities',
		migrationsDir: './src/database/migrations',
	}
}

const developmentConfig = {
	...commonDevelopmentConfig,
	type: 'sqlite',
	database: './src/database/data.sqlite',
}

const dockerDevelopmentConfig = {
	...commonDevelopmentConfig,
	type: 'postgres',
	host: process.env.POSTGRES_HOST,
	port: process.env.POSTGRES_PORT,
	username: process.env.POSTGRES_USER,
	password: process.env.POSTGRES_PASSWORD,
	database: process.env.POSTGRES_DB,
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

	default:
		exportedConfig = developmentConfig;
}

module.exports = exportedConfig;
