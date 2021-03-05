import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { compile } from 'handlebars';

import { User } from "../../entities/User.entity";
import { Survey } from "../../entities/Survey.entity";
import { Answer } from "../../entities/Answers.entity";

import { providers } from "../../constants";
import { NodeMailerFakeMailService } from "../../services/mail/NodeMailerFakeMailService";

import { NotFoundException } from '../../exceptions/resource/NotFountException';

import NPSTemplateContent from '../../views/emails/npsMail';

export interface SendSurveysToUsersRequestDTO {
	surveyId: string
	userIds: string[],
}

interface MailTemplateContext {
	name: string;
	title: string;
	description: string;
	link: string;
	answer_id: string;
	token: string;
}


@Injectable()
export class SendSurveysToUsersUseCase {
	constructor(
		@Inject(providers.surveyRepository)
		private readonly surveyRepository: Repository<Survey>,
		@Inject(providers.userRepository)
		private readonly userRepository: Repository<User>,
		@Inject(providers.answerRepository)
		private readonly answerRepository: Repository<Answer>,
		private readonly nodeMailerFakeMailService: NodeMailerFakeMailService,
	) {
		this.loadNPSMailTemplateParser();
	}

	private NPSMailTemplateParser!: HandlebarsTemplateDelegate<MailTemplateContext>;

	private loadNPSMailTemplateParser(): void {
		this.NPSMailTemplateParser = compile(NPSTemplateContent);
	}

	private async sendSurveyAndSaveAnswer(survey: Survey, user: User): Promise<Answer> {
		let answer = new Answer(survey.id, user.id);
		const userName = `${user.firstName} ${user.lastName}`;

		const body = this.NPSMailTemplateParser({
			name: userName,
			title: survey.title,
			description: survey.description,
			link: process.env.URL_MAIL as string,
			answer_id: answer.id,
			token: user.id
		});

		await this.nodeMailerFakeMailService.sendMail({
			from: { name: 'My App', address: 'noreplay@myapp.com' },
			to: { name: userName, address: user.email },
			subject: survey.title,
			body
		});

		const alreadyCreatedAnswer = await this.answerRepository.findOne({
			where: {
				userId: answer.userId,
				surveyId: answer.surveyId,
			}
		});

		if (!alreadyCreatedAnswer) {
			await this.answerRepository.insert(answer);
		} else {
			answer = alreadyCreatedAnswer;
		}
		answer.user = user;
		answer.survey = survey;
		return answer;
	}

	public async execute(data: SendSurveysToUsersRequestDTO): Promise<Answer[]> {
		const survey = await this.surveyRepository.findOne(data.surveyId);
		if (!survey) {
			throw new NotFoundException(
				`Survey with id ${data.surveyId} does not exists`,
				`Survey with id ${data.surveyId} does not exists, try to create a survey to send to users`
			);
		}

		const users = await this.userRepository.findByIds(data.userIds, {
			select: ['id', 'firstName', 'lastName', 'email'],
		});

		const answer = await Promise.all(users.map((user) =>
			this.sendSurveyAndSaveAnswer(survey, user)
		));

		return answer;
	}

}
