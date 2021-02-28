import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from 'uuid';

@Entity('users')
export class User {
	constructor(
		firstName: string,
		lastName: string,
		email: string,
	) {
		this.id = uuidv4();
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
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
		name: 'first_name',
		type: 'varchar',
		length: 40,
		generated: false,
		nullable: false,
	})
	public firstName: string;

	@Column({
		name: 'last_name',
		type: 'varchar',
		length: 40,
		generated: false,
		nullable: false,
	})
	public lastName: string;

	@Column({
		name: 'email',
		type: 'varchar',
		generated: false,
		nullable: false,
		unique: true
	})
	public email: string;

	@CreateDateColumn({
		name: 'created_at',
		type: 'timestamp with time zone',
		generated: false,
		nullable: false,
	})
	public readonly createdAt: string;
}
