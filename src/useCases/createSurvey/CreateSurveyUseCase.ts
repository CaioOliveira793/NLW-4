import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { providers } from "../../constants";
import { Survey } from "../../entities/Survey.entity";

export interface CreateSurveyRequestDTO {
	title: string,
	description: string
}


@Injectable()
export class CreateSurveyUseCase {
	constructor(
		@Inject(providers.surveyRepository)
		private readonly surveyRepository: Repository<Survey>
	) {}

	public async execute(data: CreateSurveyRequestDTO): Promise<Survey> {
		const survey = new Survey(data.title, data.description);
		await this.surveyRepository.insert(survey);
		return survey;
	}

}
