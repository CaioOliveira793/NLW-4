import { Module } from '@nestjs/common';
import { DatabaseModule } from './DatabaseModule';

import { UserController } from '../controllers/user/UserController';
import { userRepository } from '../repositories/UserRepository';
import { CreateUserUseCase } from '../useCases/createUser/CreateUserUseCase';

import { SurveyController } from '../controllers/survey/SurveyController';
import { surveyRepository } from '../repositories/SurveyRepository';
import { CreateSurveyUseCase } from '../useCases/createSurvey/CreateSurveyUseCase';
import { ListSurveysUseCase } from '../useCases/listSurveys/ListSurveysUseCase';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController, SurveyController],
  providers: [
    userRepository,
    CreateUserUseCase,
    surveyRepository,
    CreateSurveyUseCase,
    ListSurveysUseCase
  ],
})
export class AppModule {}
