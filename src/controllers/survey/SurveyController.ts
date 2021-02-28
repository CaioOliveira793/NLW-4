import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Post } from "@nestjs/common";
import { Survey } from "../../entities/Survey.entity";
import { SurveyUser } from "src/entities/SurveyUser.entity";
import { CreateSurveyUseCase, CreateSurveyRequestDTO } from "../../useCases/createSurvey/CreateSurveyUseCase";
import { ListSurveysUseCase, ListSurveysRequestDTO } from "../../useCases/listSurveys/ListSurveysUseCase";
import { SendSurveysToUsersUseCase, SendSurveysToUsersRequestDTO } from "../../useCases/sendSurveysToUsers/SentSurveysToUsersUseCase";


@Controller('/surveys')
export class SurveyController {
	constructor(
		private readonly createSurveyUseCase: CreateSurveyUseCase,
		private readonly listSurveyUseCase: ListSurveysUseCase,
		private readonly sendSurveysToUsersUseCase: SendSurveysToUsersUseCase,
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

	@Post('send')
	async sendSurvey(@Body() data: SendSurveysToUsersRequestDTO): Promise<SurveyUser[]> {
		try {
			return await this.sendSurveysToUsersUseCase.execute(data);

		} catch (err) {
			throw new HttpException({
				status: HttpStatus.INTERNAL_SERVER_ERROR,
				error: err ?? 'Unknown error',
			}, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
