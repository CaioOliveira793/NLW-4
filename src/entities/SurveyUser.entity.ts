import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from 'uuid';
import { Survey } from "./Survey.entity";
import { User } from "./User.entity";

@Entity('surveys_users')
export class SurveyUser {
	constructor(
		surveyId: string,
		userId: string,
		answer?: number,
	) {
		this.id = uuidv4();
		this.userId = userId;
		this.surveyId = surveyId;
		this.answer = answer;
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
		name: 'user_id',
		type: 'uuid',
		nullable: false,
	})
	public userId: string;

	@ManyToOne(() => User)
	@JoinColumn({ name: 'user_id' })
	user!: User;

	@Column({
		name: 'survey_id',
		type: 'uuid',
		nullable: false,
	})
	public surveyId: string;

	@ManyToOne(() => Survey)
	@JoinColumn({ name: 'survey_id' })
	survey!: Survey;

	@Column({
		name: 'answer',
		type: 'int2',
		nullable: true,
	})
	public answer?: number;

	@CreateDateColumn({
		name: 'created_at',
		type: 'timestamp with time zone',
		generated: false,
		nullable: false,
	})
	public readonly createdAt: string;
}
