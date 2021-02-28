import { Controller, Get, HttpCode, HttpException, HttpStatus, Param, Query } from '@nestjs/common';
import { CreateAnswerUseCase } from '../../useCases/createAnswer/CreateAnswerUseCase';
import { SurveyUser } from 'src/entities/SurveyUser.entity';

interface CreateAnsewerQuery {
	tk: string;
	v: string;
}

@Controller('/answers')
export class AnswerController {
	constructor(
		private readonly createAnswerUseCase: CreateAnswerUseCase
	) {}

	@Get(':id')
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
				case 'ALREADY_EXISTS':
					throw new HttpException({
						status: HttpStatus.BAD_REQUEST,
						error: err.message,
					}, HttpStatus.BAD_REQUEST);

				default:
					throw new HttpException({
						status: HttpStatus.INTERNAL_SERVER_ERROR,
						error: err ?? 'Unknown error',
					}, HttpStatus.INTERNAL_SERVER_ERROR);
			}
		}
	}
}
