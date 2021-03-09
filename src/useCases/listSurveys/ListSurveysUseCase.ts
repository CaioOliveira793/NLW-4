import { Inject, Injectable } from '@nestjs/common';
import { Repository, ILike, ObjectLiteral } from 'typeorm';
import { providers } from '../../constants';
import { Survey } from '../../entities/Survey.entity';

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
		const skip = ((data.page ?? 1) - 1) * 20;

		const props = {} as ObjectLiteral;
		if (data.title)
			props.title = ILike(`%${data.title}%`);
		if (data.description)
			props.description = ILike(`%${data.description}%`);

		return await this.surveyRepository.find({
			where: props,
			take: 20,
			skip
		});
	}

}
