import { Module } from '@nestjs/common';

import { DatabaseModule } from './DatabaseModule';

import { AnswerController } from 'src/controllers/answer/AnswerController';
import { answerRepository } from 'src/repositories/AnswerRepository';


import { globalExceptionFilterProvider } from 'src/exceptions/filters/GlobalExceptionFilter';
import { InsertAnswerUseCase } from 'src/useCases/insertAnswer/InsertAnswerUseCase';
import { CalculateNPSUseCase } from 'src/useCases/calculateNPS/CalculateNPSUseCase';
import { surveyRepository } from 'src/repositories/SurveyRepository';


@Module({
	imports: [DatabaseModule],
	controllers: [AnswerController],
	providers: [
		surveyRepository,
		answerRepository,
		InsertAnswerUseCase,
		CalculateNPSUseCase,
		globalExceptionFilterProvider
	],
	exports: [answerRepository]
})
export class AnswerModule {}
