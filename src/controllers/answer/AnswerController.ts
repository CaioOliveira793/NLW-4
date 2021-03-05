import { Controller, Get, HttpCode, Param, Post, Query } from '@nestjs/common';
import { InsertAnswerUseCase } from '../../useCases/insertAnswer/InsertAnswerUseCase';
import { Answer } from '../../entities/Answers.entity';
import { CalculateNPSUseCase, CalculateNPSResponseDTO } from '../../useCases/calculateNPS/CalculateNPSUseCase';

interface CreateAnsewerQuery {
	tk: string;
	v: string;
}


@Controller('/answers')
export class AnswerController {
	constructor(
		private readonly createAnswerUseCase: InsertAnswerUseCase,
		private readonly calculateNPSUseCase: CalculateNPSUseCase,
	) {}

	@Post(':id')
	@HttpCode(201)
	async createAnswer(@Param('id') id: string, @Query() query: CreateAnsewerQuery): Promise<Answer> {
		return await this.createAnswerUseCase.execute({
			answerId: id,
			token: query.tk,
			value: Number.parseInt(query.v),
		});
	}

	@Get('/nps/:id')
	async calculateNPS(@Param('id') id: string): Promise<CalculateNPSResponseDTO> {
		return await this.calculateNPSUseCase.execute({ surveyId: id });
	}
}
