import { Module } from '@nestjs/common';
import { DatabaseModule } from './DatabaseModule';

import { UserController } from '../controllers/user/UserController';
import { userRepository } from 'src/repositories/UserRepository';
import { CreateUserUseCase } from 'src/useCases/createUser/CreateUserUseCase';

import { SurveyController } from 'src/controllers/survey/SurveyController';
import { surveyRepository } from 'src/repositories/SurveyRepository';
import { CreateSurveyUseCase } from 'src/useCases/createSurvey/CreateSurveyUseCase';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController, SurveyController],
  providers: [
    userRepository,
    CreateUserUseCase,
    surveyRepository,
    CreateSurveyUseCase
  ],
})
export class AppModule {}
