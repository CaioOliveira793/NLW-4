import { Module } from '@nestjs/common';
import { DatabaseModule } from './DatabaseModule';

import { UserController } from '../controllers/user/UserController';
import { userRepository } from '../repositories/UserRepository';
import { CreateUserUseCase } from '../useCases/createUser/CreateUserUseCase';

import { SurveyController } from '../controllers/survey/SurveyController';
import { surveyRepository } from '../repositories/SurveyRepository';
import { CreateSurveyUseCase } from '../useCases/createSurvey/CreateSurveyUseCase';
import { ListSurveysUseCase } from '../useCases/listSurveys/ListSurveysUseCase';

import { SendSurveysToUsersUseCase } from 'src/useCases/sendSurveysToUsers/SentSurveysToUsersUseCase';
import { surveyUserRepository } from 'src/repositories/SurveyUserRepository';
import { NodeMailerMailService } from 'src/services/mail/NodeMailerMailService';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController, SurveyController],
  providers: [
    userRepository,
    surveyRepository,
    surveyUserRepository,
    CreateUserUseCase,
    CreateSurveyUseCase,
    ListSurveysUseCase,
    SendSurveysToUsersUseCase,
    NodeMailerMailService
  ],
})
export class AppModule {}
