import { Body, Controller, Get, Param, Put, UseFilters } from '@nestjs/common';

import { Answer } from '../../entities/Answers.entity';
import { InsertAnswerUseCase } from '../../useCases/insertAnswer/InsertAnswerUseCase';
import { CalculateNPSUseCase, CalculateNPSResponseDTO } from '../../useCases/calculateNPS/CalculateNPSUseCase';

import { uuidSchema } from '../../validation/uuidSchema';
import { createAnswerQuerySchema } from '../../validation/answer/CreateAnswer';
import { ValidationPipe } from '../../pipes/ValidationPipe';
import { DefaultExceptionFilter } from '../../exceptions/filters/ExceptionFilter';


export interface CreateAnsewerBody {
	token: string;
	value: number;
}


@UseFilters(DefaultExceptionFilter)
@Controller('/answers')
export class AnswerController {
	constructor(
		private readonly createAnswerUseCase: InsertAnswerUseCase,
		private readonly calculateNPSUseCase: CalculateNPSUseCase,
	) {}

	@Put(':id')
	async respondAnswer(
		@Param('id', new ValidationPipe(uuidSchema)) id: string,
		@Body(new ValidationPipe(createAnswerQuerySchema)) body: CreateAnsewerBody
	): Promise<Answer> {
		return await this.createAnswerUseCase.execute({
			answerId: id,
			token: body.token,
			value: body.value,
		});
	}

	@Get(':id/nps')
	async calculateNPS(
		@Param('id', new ValidationPipe(uuidSchema)) id: string
	): Promise<CalculateNPSResponseDTO> {
		return await this.calculateNPSUseCase.execute({ surveyId: id });
	}
}
