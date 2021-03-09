import { Controller, Get, HttpCode, Param, Post, Query } from '@nestjs/common';
import * as Joi from 'joi';
import { Answer } from '../../entities/Answers.entity';
import { InsertAnswerUseCase } from '../../useCases/insertAnswer/InsertAnswerUseCase';
import { CalculateNPSUseCase, CalculateNPSResponseDTO } from '../../useCases/calculateNPS/CalculateNPSUseCase';
import { JoiValidationPipe } from '../../pipes/JoiValidationPipe';
import { uuid, Answer as AnswerSchema } from '../../validation/Schemas';


interface CreateAnsewerQuery {
	tk: string;
	v: number;
}

const createAnswerQueryValidator = Joi.object<CreateAnsewerQuery>({
	tk: uuid.required(),
	v: AnswerSchema.answer.required()
});


@Controller('/answers')
export class AnswerController {
	constructor(
		private readonly createAnswerUseCase: InsertAnswerUseCase,
		private readonly calculateNPSUseCase: CalculateNPSUseCase,
	) {}

	@Post(':id')
	@HttpCode(201)
	async createAnswer(
		@Param('id', new JoiValidationPipe(Joi.object(uuid))) id: string,
		@Query(new JoiValidationPipe(createAnswerQueryValidator)) query: CreateAnsewerQuery
	): Promise<Answer> {
		return await this.createAnswerUseCase.execute({
			answerId: id,
			token: query.tk,
			value: query.v,
		});
	}

	@Get('/nps/:id')
	async calculateNPS(
		@Param('id', new JoiValidationPipe(Joi.object(uuid))) id: string
	): Promise<CalculateNPSResponseDTO> {
		return await this.calculateNPSUseCase.execute({ surveyId: id });
	}
}
