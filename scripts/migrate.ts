import { createConnection } from 'typeorm';

import connectionOptions from '../src/database/connections';

async function migrate(): Promise<void> {
	const connection = await createConnection(connectionOptions);
	await connection.connect();
	await connection.runMigrations();
	await connection.close();
}

migrate().catch(err => { console.error(err) });
