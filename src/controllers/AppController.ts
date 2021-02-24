import { Body, Controller, Get } from '@nestjs/common';
import { SayHelloUseCase, SayHelloRequestDTO } from '../useCases/SayHelloUseCase';


@Controller()
export class AppController {
  constructor(private readonly sayHelloUseCase: SayHelloUseCase) {}

  @Get('/hello')
  getHello(@Body() data: SayHelloRequestDTO): string {
    return this.sayHelloUseCase.execute(data);
  }
}
