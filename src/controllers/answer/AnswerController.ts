import { Controller, Get, HttpCode, HttpException, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { CreateAnswerUseCase } from '../../useCases/createAnswer/CreateAnswerUseCase';
import { SurveyUser } from 'src/entities/SurveyUser.entity';
import { CalculateNPSUseCase, CalculateNPSResponseDTO } from 'src/useCases/calculateNPS/CalculateNPSUseCase';

interface CreateAnsewerQuery {
	tk: string;
	v: string;
}


@Controller('/answers')
export class AnswerController {
	constructor(
		private readonly createAnswerUseCase: CreateAnswerUseCase,
		private readonly calculateNPSUseCase: CalculateNPSUseCase,
	) {}

	@Post(':id')
	@HttpCode(201)
	async createAnswer(@Param('id') id: string, @Query() query: CreateAnsewerQuery): Promise<SurveyUser> {
		try {
			return await this.createAnswerUseCase.execute({
				surveyUserId: id,
				token: query.tk,
				value: Number.parseInt(query.v),
			});

		} catch (err) {
			switch (err.type) {
				default:
					throw new HttpException({
						status: HttpStatus.INTERNAL_SERVER_ERROR,
						error: err ?? 'Unknown error',
					}, HttpStatus.INTERNAL_SERVER_ERROR);
			}
		}
	}

	@Get('/nps/:id')
	async calculateNPS(@Param('id') id: string): Promise<CalculateNPSResponseDTO> {
		try {
			return await this.calculateNPSUseCase.execute({ surveyId: id });
		} catch (err) {
			switch (err.type) {
				default:
					throw new HttpException({
						status: HttpStatus.INTERNAL_SERVER_ERROR,
						error: err ?? 'Unknown error',
					}, HttpStatus.INTERNAL_SERVER_ERROR);
			}
		}
	}
}
