import { Inject, Injectable } from "@nestjs/common";
import { Between, Repository } from "typeorm";
import { Answer } from "../../entities/Answers.entity";
import { providers } from "../../constants";
import { Survey } from "../../entities/Survey.entity";
import { NotFoundException } from "../../exceptions/resource/NotFountException";
import { ConflictException } from "../../exceptions/resource/ConflictException";


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
		@Inject(providers.answerRepository)
		private readonly answerRepository: Repository<Answer>,
		@Inject(providers.surveyRepository)
		private readonly surveyRepository: Repository<Survey>,
	) {}

	private async verifyAnswer(surveyId: string): Promise<void> {
		const sendedSurvey = await this.answerRepository.findOne({
			where: { surveyId: surveyId }
		});

		if (!sendedSurvey) {
			const createdSurvey = await this.surveyRepository.findOne(surveyId);

			if (!createdSurvey) {
				throw new NotFoundException(
					`Survey with id ${surveyId} does not exists`,
					`Survey with id ${surveyId} does not exists, try to create a survey to send to users`
				);
			}
			throw new ConflictException(
				`Survey with id ${surveyId} was not sended to any User`,
				`Try to send the survey with id ${surveyId} to Users and resend the request`
			);
		}
	}

	public async execute(data: CalculateNPSRequestDTO): Promise<CalculateNPSResponseDTO> {
		await this.verifyAnswer(data.surveyId);

		const detractors = await this.answerRepository.count({
			where: { surveyId: data.surveyId, answer: Between(0, 6) }
		});

		const passive = await this.answerRepository.count({
			where: { surveyId: data.surveyId, answer: Between(7, 8) }
		});

		const promoters = await this.answerRepository.count({
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
	}

}
