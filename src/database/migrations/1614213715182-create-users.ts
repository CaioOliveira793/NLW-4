import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createUsers1614213715182 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'users',
				columns: [{
					name: 'id',
					type: 'uuid',
					isNullable: false,
					isPrimary: true,
					isUnique: true,
				}, {
					name: 'first_name',
					type: 'varchar',
					length: '40',
					isNullable: false,
				}, {
					name: 'last_name',
					type: 'varchar',
					length: '40',
					isNullable: false,
				}, {
					name: 'email',
					type: 'varchar',
					isNullable: false,
					isUnique: true,
				}, {
					name: 'created_at',
					// TODO: use 'timestamp with time zone'
					type: 'timestamp with time zone',
					isNullable: false,
				}]
			})
		)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('users');
	}

}
