import { Module } from '@nestjs/common';
import { DatabaseModule } from './DatabaseModule';

import { UserModule } from './UserModule';
import { SurveyModule } from './SurveyModule';
import { AnswerModule } from './AnswerModule';


@Module({
  imports: [
    DatabaseModule,
    UserModule,
    SurveyModule,
    AnswerModule,
  ],
})
export class AppModule {}
