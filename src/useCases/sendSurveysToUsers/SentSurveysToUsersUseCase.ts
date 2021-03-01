import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { compile } from 'handlebars';

import { User } from "../../entities/User.entity";
import { Survey } from "../../entities/Survey.entity";
import { SurveyUser } from "../../entities/SurveyUser.entity";

import { providers } from "../../constants";
import { NodeMailerMailService } from "../../services/mail/NodeMailerMailService";

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
	survey_user_id: string;
	token: string;
}


@Injectable()
export class SendSurveysToUsersUseCase {
	constructor(
		@Inject(providers.surveyRepository)
		private readonly surveyRepository: Repository<Survey>,
		@Inject(providers.userRepository)
		private readonly userRepository: Repository<User>,
		@Inject(providers.surveyUserRepository)
		private readonly surveyUserRepository: Repository<SurveyUser>,
		private readonly nodeMailerMailService: NodeMailerMailService,
	) {
		this.loadNPSMailTemplateParser();
	}

	private NPSMailTemplateParser!: HandlebarsTemplateDelegate<MailTemplateContext>;

	private loadNPSMailTemplateParser(): void {
		this.NPSMailTemplateParser = compile(NPSTemplateContent);
	}

	private async sendSurveyAndSaveSurveyUser(survey: Survey, user: User): Promise<SurveyUser> {
		let surveyUser = new SurveyUser(survey.id, user.id);
		const userName = `${user.firstName} ${user.lastName}`;

		const body = this.NPSMailTemplateParser({
			name: userName,
			title: survey.title,
			description: survey.description,
			link: process.env.URL_MAIL as string,
			survey_user_id: surveyUser.id,
			token: user.id
		});

		await this.nodeMailerMailService.sendMail({
			from: { name: 'My App', address: 'noreplay@myapp.com' },
			to: { name: userName, address: user.email },
			subject: survey.title,
			body
		});

		const alreadyCreatedSurveyUser = await this.surveyUserRepository.findOne({
			where: {
				userId: surveyUser.userId,
				surveyId: surveyUser.surveyId,
			}
		});

		if (!alreadyCreatedSurveyUser) {
			await this.surveyUserRepository.insert(surveyUser);
		} else {
			surveyUser = alreadyCreatedSurveyUser;
		}
		surveyUser.user = user;
		surveyUser.survey = survey;
		return surveyUser;
	}

	public async execute(data: SendSurveysToUsersRequestDTO): Promise<SurveyUser[]> {
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

		const surveyUsers = await Promise.all(users.map((user) => {
			if (!user.id) {
				throw new NotFoundException(
					`User with id ${data.surveyId} does not exists`,
					`User with id ${data.surveyId} does not exists, try to send the survey to an existing users`
				);
			}
			return this.sendSurveyAndSaveSurveyUser(survey, user);
		}));

		return surveyUsers;
	}

}
