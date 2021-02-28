import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createSurveysUsers1614435675378 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'surveys_users',
				columns: [{
					name: 'id',
					type: 'uuid',
					isPrimary: true,
					isGenerated: false,
					isNullable: false,
					isUnique: true,
				}, {
					name: 'user_id',
					type: 'uuid',
					isNullable: false,
				}, {
					name: 'survey_id',
					type: 'uuid',
					isNullable: false,
				}, {
					name: 'answer',
					type: 'int2',
					isNullable: true,
				}, {
					name: 'created_at',
					type: 'timestamp with time zone',
					isGenerated: false,
					isNullable: false,
				}],
				foreignKeys: [{
					name: 'FK_user',
					referencedTableName: 'users',
					referencedColumnNames: ['id'],
					columnNames: ['user_id'],
					onUpdate: 'CASCADE',
					onDelete: 'CASCADE',
				}, {
					name: 'FK_survey',
					referencedTableName: 'surveys',
					referencedColumnNames: ['id'],
					columnNames: ['survey_id'],
					onUpdate: 'CASCADE',
					onDelete: 'CASCADE',
				}],
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('surveys_users');
	}

}
