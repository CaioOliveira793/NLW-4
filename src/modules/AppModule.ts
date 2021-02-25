import { Module } from '@nestjs/common';
import { AppController } from '../controllers/AppController';
import { SayHelloUseCase } from '../useCases/SayHelloUseCase';
import { DatabaseModule } from './DatabaseModule';

@Module({
  imports: [DatabaseModule],
  controllers: [AppController],
  providers: [SayHelloUseCase],
})
export class AppModule {}
