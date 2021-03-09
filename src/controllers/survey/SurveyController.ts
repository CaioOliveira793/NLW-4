import { Body, Controller, Get, HttpCode, Post, Query } from '@nestjs/common';
import * as Joi from 'joi';
import { Survey } from '../../entities/Survey.entity';
import { Answer } from '../../entities/Answers.entity';

import { CreateSurveyUseCase, CreateSurveyRequestDTO } from '../../useCases/createSurvey/CreateSurveyUseCase';
import { ListSurveysUseCase } from '../../useCases/listSurveys/ListSurveysUseCase';
import { SendSurveysToUsersUseCase, SendSurveysToUsersRequestDTO } from '../../useCases/sendSurveysToUsers/SendSurveysToUsersUseCase';
import { createSurveyRequestDTOSchema } from '../../useCases/createSurvey/CreateSurveyDTOValidation';
import { sendSurveysToUsersRequestDTOSchema } from '../../useCases/sendSurveysToUsers/SendSurveyToUsersDTOValidation';
import { pageList, Survey as SurveyValidator } from '../../validation/Schemas';

import { JoiValidationPipe } from '../../pipes/JoiValidationPipe';


interface listSurveysBody {
	title?: string,
	description?: string,
}

interface listSurveysQuery {
	page?: number;
}

export const listSurveysBodySchema: Joi.ObjectSchema = Joi.object<listSurveysBody>({
	title: SurveyValidator.title,
	description: SurveyValidator.description,
});

export const listSurveysQuerySchema: Joi.ObjectSchema = Joi.object<listSurveysQuery>({
	page: pageList
});


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
		@Body(new JoiValidationPipe(createSurveyRequestDTOSchema)) data: CreateSurveyRequestDTO
	): Promise<Survey> {
		return await this.createSurveyUseCase.execute(data);
	}

	@Get()
	async listSurveys(
		@Body(new JoiValidationPipe(listSurveysBodySchema)) data: listSurveysBody,
		@Query(new JoiValidationPipe(listSurveysQuerySchema)) query: listSurveysQuery,
	): Promise<Survey[]> {
		return await this.listSurveyUseCase.execute({
			...data,
			page: query.page
		});
	}

	@Post('/send')
	async sendSurvey(@Body(new JoiValidationPipe(sendSurveysToUsersRequestDTOSchema)) data: SendSurveysToUsersRequestDTO): Promise<Answer[]> {
		return await this.sendSurveysToUsersUseCase.execute(data);
	}
}
