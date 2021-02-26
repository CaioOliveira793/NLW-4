import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Post } from "@nestjs/common";
import { Survey } from "src/entities/Survey.entity";
import { CreateSurveyUseCase, CreateSurveyRequestDTO } from "src/useCases/createSurvey/CreateSurveyUseCase";
import { ListSurveysUseCase, ListSurveysRequestDTO } from "src/useCases/listSurveys/ListSurveysUseCase";


@Controller('/surveys')
export class SurveyController {
	constructor(
		private readonly createSurveyUseCase: CreateSurveyUseCase,
		private readonly listSurveyUseCase: ListSurveysUseCase,
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

	@Get()
	async listSurveys(@Body() data: ListSurveysRequestDTO): Promise<Survey[]> {
		try {
			return await this.listSurveyUseCase.execute(data);

		} catch (err) {
			throw new HttpException({
				status: HttpStatus.INTERNAL_SERVER_ERROR,
				error: err ?? 'Unknown error',
			}, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
