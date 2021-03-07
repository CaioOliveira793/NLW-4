import { Inject, Injectable } from "@nestjs/common";
import { Repository, ILike } from "typeorm";
import { providers } from "../../constants";
import { Survey } from "../../entities/Survey.entity";

export interface ListSurveysRequestDTO {
	title?: string,
	description?: string,
	page?: number,
}


@Injectable()
export class ListSurveysUseCase {
	constructor(
		@Inject(providers.surveyRepository)
		private readonly surveyRepository: Repository<Survey>
	) {}

	public async execute(data: ListSurveysRequestDTO): Promise<Survey[]> {
		const skip = Math.max(data.page ?? 1, 1);
		return await this.surveyRepository.find({
			where: {
				title: (data.title) ? ILike(`%${data.title}%`) : undefined,
				description: (data.description) ? ILike(`%${data.description}%`) : undefined
			},
			take: 20,
			skip
		});
	}

}
