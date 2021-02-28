import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { SurveyUser } from "../../entities/SurveyUser.entity";
import { providers } from "../../constants";


export interface CreateAnswerRequestDTO {
	surveyUserId: string;
	token: string;
	value: number;
}


@Injectable()
export class CreateAnswerUseCase {
	constructor(
		@Inject(providers.surveyUserRepository)
		private readonly surveyUserRepository: Repository<SurveyUser>,
	) {}

	public async execute(data: CreateAnswerRequestDTO): Promise<SurveyUser> {
		try {
			const surveyUser = await this.surveyUserRepository.findOne(data.surveyUserId);

			if (!surveyUser) {
				throw new Error(`SurveyUser with id ${data.surveyUserId} does not exists`);
			}
			if (surveyUser.userId !== data.token) {
				throw new Error(`Token ${data.token} is not valid`);
			}
			if (data.value < 0 || data.value > 10) {
				throw new Error(`Answer value ${data.value} is out of bounds (0 < value < 10)`);
			}

			surveyUser.answer = Math.floor(data.value);
			this.surveyUserRepository.update({ id: surveyUser.id }, { answer: surveyUser.answer });
			return surveyUser;
		} catch (err) {
			throw new Error('Unknown error');
		}
	}

}
