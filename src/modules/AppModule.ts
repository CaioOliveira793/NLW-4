import { Module } from '@nestjs/common';
import { AppController } from '../controllers/AppController';
import { SayHelloUseCase } from '../useCases/SayHelloUseCase';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [SayHelloUseCase],
})
export class AppModule {}
