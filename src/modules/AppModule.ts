import { Module } from '@nestjs/common';
import { DatabaseModule } from './DatabaseModule';

import { UserController } from '../controllers/user/UserController';
import { userRepository } from '../repositories/UserRepository';
import { CreateUserUseCase } from '../useCases/createUser/CreateUserUseCase';

import { SurveyController } from '../controllers/survey/SurveyController';
import { CreateSurveyUseCase } from '../useCases/createSurvey/CreateSurveyUseCase';
import { ListSurveysUseCase } from '../useCases/listSurveys/ListSurveysUseCase';
import { SendSurveysToUsersUseCase } from 'src/useCases/sendSurveysToUsers/SentSurveysToUsersUseCase';
import { surveyRepository } from '../repositories/SurveyRepository';
import { surveyUserRepository } from 'src/repositories/SurveyUserRepository';
import { NodeMailerMailService } from 'src/services/mail/NodeMailerMailService';

import { AnswerController } from 'src/controllers/answer/AnswerController';
import { CreateAnswerUseCase } from 'src/useCases/createAnswer/CreateAnswerUseCase';
import { CalculateNPSUseCase } from 'src/useCases/calculateNPS/CalculateNPSUseCase';

import { globalExceptionFilterProvider } from 'src/exceptions/filters/GlobalExceptionFilter';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController, SurveyController, AnswerController],
  providers: [
    userRepository,
    surveyRepository,
    surveyUserRepository,
    CreateUserUseCase,
    CreateSurveyUseCase,
    ListSurveysUseCase,
    SendSurveysToUsersUseCase,
    CreateAnswerUseCase,
    CalculateNPSUseCase,
    NodeMailerMailService,
    globalExceptionFilterProvider
  ],
})
export class AppModule {}
