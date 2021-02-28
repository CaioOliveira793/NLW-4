import { Inject, Injectable } from "@nestjs/common";
import { Between, Repository } from "typeorm";
import { SurveyUser } from "../../entities/SurveyUser.entity";
import { providers } from "../../constants";
import { Survey } from "src/entities/Survey.entity";


export interface CalculateNPSRequestDTO {
	surveyId: string;
}

export interface CalculateNPSResponseDTO {
	percentage: number;
	detractors: number;
	passive: number;
	promoters: number;
	total: number;
}


@Injectable()
export class CalculateNPSUseCase {
	constructor(
		@Inject(providers.surveyUserRepository)
		private readonly surveyUserRepository: Repository<SurveyUser>,
		@Inject(providers.surveyRepository)
		private readonly surveyRepository: Repository<Survey>,
	) {}

	private async verifyAnswer(surveyId: string): Promise<void> {
		const sendedSurvey = await this.surveyUserRepository.findOne({
			where: { surveyId: surveyId }
		});

		if (!sendedSurvey) {
			const createdSurvey = await this.surveyRepository.findOne({
				where: { id: surveyId }
			});

			if (!createdSurvey) {
				throw new Error(`Survey with id ${surveyId} does not exists`);
			}
			throw new Error(`Survey with id ${surveyId} was not sended to any User`);
		}
	}

	public async execute(data: CalculateNPSRequestDTO): Promise<CalculateNPSResponseDTO> {
		await this.verifyAnswer(data.surveyId);

		try {
			const detractors = await this.surveyUserRepository.count({
				where: { surveyId: data.surveyId, answer: Between(0, 6) }
			});

			const passive = await this.surveyUserRepository.count({
				where: { surveyId: data.surveyId, answer: Between(7, 8) }
			});

			const promoters = await this.surveyUserRepository.count({
				where: { surveyId: data.surveyId, answer: Between(9, 10) }
			});

			const total = detractors + passive + promoters;
			return {
				detractors,
				passive,
				promoters,
				percentage: (promoters - detractors) / total * 100,
				total
			};
		} catch (err) {
			throw new Error('Unknown error');
		}
	}

}
