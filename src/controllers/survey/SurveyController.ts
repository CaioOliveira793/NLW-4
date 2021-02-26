import { Body, Controller, HttpCode, HttpException, HttpStatus, Post } from "@nestjs/common";
import { Survey } from "src/entities/Survey.entity";
import { CreateSurveyUseCase, CreateSurveyRequestDTO } from "src/useCases/createSurvey/CreateSurveyUseCase";


@Controller('/surveys')
export class SurveyController {
	constructor(
		private readonly createSurveyUseCase: CreateSurveyUseCase
	) {}

	@Post()
	@HttpCode(201)
	async createSurveys(@Body() data: CreateSurveyRequestDTO): Promise<Survey> {
		try {
			return await this.createSurveyUseCase.execute(data);

		} catch (err) {
			throw new HttpException({
				status: HttpStatus.INTERNAL_SERVER_ERROR,
				error: err ?? 'Unknown error',
			}, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}
