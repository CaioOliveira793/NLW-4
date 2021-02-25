const commonDevelopmentConfig = {
	synchronize: true,
	entities: [
		'./src/schemas/*.entity{.ts,.js}'
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
	logNotifications: true,
	migrationsRun: true,
}



module.exports = (process.env.NODE_ENV === 'docker_development') ?
	dockerDevelopmentConfig :
	developmentConfig;
