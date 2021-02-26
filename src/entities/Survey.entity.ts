import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from 'uuid';

@Entity('surveys')
export class Survey {
	constructor(
		title: string,
		description: string,
	) {
		this.id = uuidv4();
		this.title = title;
		this.description = description;
		this.createdAt = new Date().toISOString();
	}

	@PrimaryColumn({
		name: 'id',
		type: 'uuid',
		primary: true,
		generated: false,
		nullable: false,
		unique: true
	})
	public readonly id: string;

	@Column({
		name: 'title',
		type: 'varchar',
		length: 30,
		nullable: false,
	})
	public title: string;

	@Column({
		name: 'description',
		type: 'varchar',
		length: 512,
		nullable: false,
	})
	public description: string;

	@CreateDateColumn({
		name: 'created_at',
		type: 'timestamp with time zone',
		generated: false,
		nullable: false,
	})
	public createdAt: string;
}
