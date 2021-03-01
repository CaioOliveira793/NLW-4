import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { providers } from "../../constants";
import { Survey } from "../../entities/Survey.entity";

export interface ListSurveysRequestDTO {
	title?: string,
	description?: string
}


@Injectable()
export class ListSurveysUseCase {
	constructor(
		@Inject(providers.surveyRepository)
		private readonly surveyRepository: Repository<Survey>
	) {}

	public async execute(data: ListSurveysRequestDTO): Promise<Survey[]> {
		// FIXME: fix survey query
		return await this.surveyRepository.find({ where: data });
	}

}
