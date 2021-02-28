import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createSurveys1614306934719 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'surveys',
				columns: [{
					name: 'id',
					type: 'uuid',
					isPrimary: true,
					isGenerated: false,
					isUnique: true,
					isNullable: false,
				}, {
					name: 'title',
					type: 'varchar',
					length: '30',
					isNullable: false,
				}, {
					name: 'description',
					type: 'varchar',
					length: '512',
					isNullable: true,
				}, {
					name: 'created_at',
					type: 'timestamp with time zone',
					isGenerated: false,
					isNullable: false,
				}]
			})
		)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('surveys');
	}

}
