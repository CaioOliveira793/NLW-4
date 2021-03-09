import { Body, Controller, Get, HttpCode, Post, Query } from '@nestjs/common';
import { Survey } from '../../entities/Survey.entity';
import { Answer } from '../../entities/Answers.entity';

import { CreateSurveyUseCase } from '../../useCases/createSurvey/CreateSurveyUseCase';
import { ListSurveysUseCase } from '../../useCases/listSurveys/ListSurveysUseCase';
import { SendSurveysToUsersUseCase } from '../../useCases/sendSurveysToUsers/SendSurveysToUsersUseCase';

import { createSurveyBodySchema } from '../../validation/survey/CreateSurvey';
import { listSurveysBodySchema, listSurveysQuerySchema } from '../../validation/survey/ListSurvey';
import { sendSurveyBodySchema } from '../../validation/survey/SendSurvey';
import { ValidationPipe } from '../../pipes/ValidationPipe';


export interface CreateSurveyBody {
	title: string;
	description: string;
}


export interface ListSurveysBody {
	title?: string,
	description?: string,
}

export interface ListSurveysQuery {
	page?: number;
}


export interface SendSurveyBody {
	surveyId: string;
	userIds: string[];
}


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
		@Body(new ValidationPipe(listSurveysBodySchema)) data: ListSurveysBody,
		@Query(new ValidationPipe(listSurveysQuerySchema)) query: ListSurveysQuery,
	): Promise<Survey[]> {
		return await this.listSurveyUseCase.execute({
			...data,
			page: query.page
		});
	}

	@Post('/send')
	async sendSurvey(
		@Body(new ValidationPipe(sendSurveyBodySchema)) data: SendSurveyBody,
	): Promise<Answer[]> {
		return await this.sendSurveysToUsersUseCase.execute(data);
	}
}
