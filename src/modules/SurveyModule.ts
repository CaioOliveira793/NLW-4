import { Module } from '@nestjs/common';

import { DatabaseModule } from './DatabaseModule';

import { SurveyController } from '../controllers/survey/SurveyController';

import { surveyRepository } from '../repositories/SurveyRepository';
import { userRepository } from '../repositories/UserRepository';
import { answerRepository } from '../repositories/AnswerRepository';

import { CreateSurveyUseCase } from '../useCases/createSurvey/CreateSurveyUseCase';
import { ListSurveysUseCase } from '../useCases/listSurveys/ListSurveysUseCase';
import { SendSurveysToUsersUseCase } from '../useCases/sendSurveysToUsers/SendSurveysToUsersUseCase';

import { NodeMailerFakeMailService } from '../services/mail/NodeMailerFakeMailService';

import { globalExceptionFilterProvider } from '../exceptions/filters/GlobalExceptionFilter';


@Module({
	imports: [DatabaseModule],
	controllers: [SurveyController],
	providers: [
		userRepository,
    surveyRepository,
    answerRepository,
		CreateSurveyUseCase,
		ListSurveysUseCase,
		SendSurveysToUsersUseCase,
		NodeMailerFakeMailService,
		globalExceptionFilterProvider
	],
	exports: [surveyRepository]
})
export class SurveyModule {}
