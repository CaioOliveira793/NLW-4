import { Module } from '@nestjs/common';
import { DatabaseModule } from './DatabaseModule';
import { UserController } from '../controllers/user/UserController';
import { userRepository } from 'src/repositories/UserRepository';
import { CreateUserUseCase } from 'src/useCases/createUser/CreateUserUseCase';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [userRepository, CreateUserUseCase],
})
export class AppModule {}
