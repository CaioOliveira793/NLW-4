import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "src/entities/User.entity";
import { Survey } from "../../entities/Survey.entity";
import { SurveyUser } from "src/entities/SurveyUser.entity";
import { providers } from "../../constants";
import { NodeMailerMailService } from "src/services/mail/NodeMailerMailService";

export interface SendSurveysToUsersRequestDTO {
	surveyId: string
	userIds: string[],
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
	) {}

	private async sendSurveyAndSaveSurveyUser(survey: Survey, user: User): Promise<SurveyUser> {
		const surveyUser = new SurveyUser(survey.id, user.id);

		try {
			// send:
			await this.nodeMailerMailService.sendMail({
				from: {
					name: 'My App',
					address: 'noreplay@myapp.com'
				},
				to: {
					name: `${user.firstName} ${user.lastName}`,
					address: user.email
				},
				subject: survey.title,
				body: survey.description
			});

			// save:
			await this.surveyUserRepository.insert(surveyUser);
		} catch (err) {
			console.log(err);
		}

		return surveyUser;
	}

	public async execute(data: SendSurveysToUsersRequestDTO): Promise<SurveyUser[]> {
		try {
			const survey = await this.surveyRepository.findOne(data.surveyId);
			if (!survey) {
				throw new Error(`Survey with id ${data.surveyId} does not exists`);
			}

			const users = await this.userRepository.findByIds(data.userIds, {
				select: ['id', 'firstName', 'lastName', 'email'],
			});

			console.log(users);

			const surveyUsers = await Promise.all(users.map((user) => {
				if (!user.id) {
					throw new Error(`User with id ${data.surveyId} does not exists`);
				}
				return this.sendSurveyAndSaveSurveyUser(survey, user);
			}));

			return surveyUsers;
		} catch (err) {
			throw new Error('Unknown error');
		}
	}

}
