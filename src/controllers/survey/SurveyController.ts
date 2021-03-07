import { Body, Controller, Get, HttpCode, Post } from "@nestjs/common";
import { Survey } from "../../entities/Survey.entity";
import { Answer } from "../../entities/Answers.entity";
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
		return await this.createSurveyUseCase.execute(data);
	}

	@Get()
	async listSurveys(@Body() data: ListSurveysRequestDTO): Promise<Survey[]> {
		return await this.listSurveyUseCase.execute(data);
	}

	@Post('/send')
	async sendSurvey(@Body() data: SendSurveysToUsersRequestDTO): Promise<Answer[]> {
		return await this.sendSurveysToUsersUseCase.execute(data);
	}
}
