import { Body, Controller, Get, HttpCode, Param, Post, Query, UseFilters } from '@nestjs/common';
import { Survey } from '../../entities/Survey.entity';
import { Answer } from '../../entities/Answers.entity';

import { CreateSurveyUseCase } from '../../useCases/createSurvey/CreateSurveyUseCase';
import { ListSurveysUseCase } from '../../useCases/listSurveys/ListSurveysUseCase';
import { SendSurveysToUsersUseCase } from '../../useCases/sendSurveysToUsers/SendSurveysToUsersUseCase';

import { createSurveyBodySchema } from '../../validation/survey/CreateSurvey';
import { listSurveysQuerySchema } from '../../validation/survey/ListSurvey';
import { sendSurveyBodySchema } from '../../validation/survey/SendSurvey';
import { ValidationPipe } from '../../pipes/ValidationPipe';
import { DefaultExceptionFilter } from '../../exceptions/filters/ExceptionFilter';
import { uuidSchema } from '../../validation/uuidSchema';


export interface CreateSurveyBody {
	title: string;
	description: string;
}


export interface ListSurveysQuery {
	title?: string;
	des?: string;
	page?: number;
}


export type SendSurveyBody = string[];


@UseFilters(DefaultExceptionFilter)
@Controller('/surveys')
export class SurveyController {
	constructor(
		private readonly createSurveyUseCase: CreateSurveyUseCase,
		private readonly listSurveyUseCase: ListSurveysUseCase,
		private readonly sendSurveysToUsersUseCase: SendSurveysToUsersUseCase,
	) {}

	@Post()
	@HttpCode(201)
	async createSurveys(
		@Body(new ValidationPipe(createSurveyBodySchema)) data: CreateSurveyBody,
	): Promise<Survey> {
		return await this.createSurveyUseCase.execute(data);
	}

	@Get()
	async listSurveys(
		@Query(new ValidationPipe(listSurveysQuerySchema)) query: ListSurveysQuery,
	): Promise<Survey[]> {
		return await this.listSurveyUseCase.execute({
			description: query.des,
			title: query.title,
			page: query.page
		});
	}

	@Post('/:id/send')
	async sendSurvey(
		@Param('id', new ValidationPipe(uuidSchema)) surveyId: string,
		@Body(new ValidationPipe(sendSurveyBodySchema)) userIds: SendSurveyBody,
	): Promise<Answer[]> {
		return await this.sendSurveysToUsersUseCase.execute({
			surveyId,
			userIds
		});
	}
}
