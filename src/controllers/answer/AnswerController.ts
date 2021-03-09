import { Controller, Get, HttpCode, Param, Post, Query } from '@nestjs/common';

import { Answer } from '../../entities/Answers.entity';
import { InsertAnswerUseCase } from '../../useCases/insertAnswer/InsertAnswerUseCase';
import { CalculateNPSUseCase, CalculateNPSResponseDTO } from '../../useCases/calculateNPS/CalculateNPSUseCase';

import { uuidSchema } from '../../validation/uuidSchema';
import { createAnswerQuerySchema } from '../../validation/answer/CreateAnswer';
import { ValidationPipe } from '../../pipes/ValidationPipe';


export interface CreateAnsewerQuery {
	tk: string;
	v: number;
}


@Controller('/answers')
export class AnswerController {
	constructor(
		private readonly createAnswerUseCase: InsertAnswerUseCase,
		private readonly calculateNPSUseCase: CalculateNPSUseCase,
	) {}

	@Post(':id')
	@HttpCode(201)
	async createAnswer(
		@Param('id', new ValidationPipe(uuidSchema)) id: string,
		@Query(new ValidationPipe(createAnswerQuerySchema)) query: CreateAnsewerQuery
	): Promise<Answer> {
		return await this.createAnswerUseCase.execute({
			answerId: id,
			token: query.tk,
			value: query.v,
		});
	}

	@Get('/nps/:id')
	async calculateNPS(
		@Param('id', new ValidationPipe(uuidSchema)) id: string
	): Promise<CalculateNPSResponseDTO> {
		return await this.calculateNPSUseCase.execute({ surveyId: id });
	}
}
