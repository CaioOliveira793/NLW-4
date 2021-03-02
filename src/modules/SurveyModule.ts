import { Module } from '@nestjs/common';

import { DatabaseModule } from './DatabaseModule';

import { SurveyController } from 'src/controllers/survey/SurveyController';

import { surveyRepository } from 'src/repositories/SurveyRepository';
import { userRepository } from 'src/repositories/UserRepository';
import { answerRepository } from 'src/repositories/AnswerRepository';

import { CreateSurveyUseCase } from 'src/useCases/createSurvey/CreateSurveyUseCase';
import { ListSurveysUseCase } from 'src/useCases/listSurveys/ListSurveysUseCase';
import { SendSurveysToUsersUseCase } from 'src/useCases/sendSurveysToUsers/SentSurveysToUsersUseCase';

import { NodeMailerFakeMailService } from 'src/services/mail/NodeMailerFakeMailService';

import { globalExceptionFilterProvider } from 'src/exceptions/filters/GlobalExceptionFilter';


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
