import { Module } from '@nestjs/common';

import { DatabaseModule } from './DatabaseModule';

import { AnswerController } from '../controllers/answer/AnswerController';
import { answerRepository } from '../repositories/AnswerRepository';


import { InsertAnswerUseCase } from '../useCases/insertAnswer/InsertAnswerUseCase';
import { CalculateNPSUseCase } from '../useCases/calculateNPS/CalculateNPSUseCase';
import { surveyRepository } from '../repositories/SurveyRepository';


@Module({
	imports: [DatabaseModule],
	controllers: [AnswerController],
	providers: [
		surveyRepository,
		answerRepository,
		InsertAnswerUseCase,
		CalculateNPSUseCase
	],
	exports: [answerRepository]
})
export class AnswerModule {}
