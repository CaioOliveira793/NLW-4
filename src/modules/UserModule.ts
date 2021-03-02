import { Module } from '@nestjs/common';

import { DatabaseModule } from './DatabaseModule';

import { UserController } from 'src/controllers/user/UserController';
import { userRepository } from 'src/repositories/UserRepository';

import { CreateUserUseCase } from 'src/useCases/createUser/CreateUserUseCase';

import { globalExceptionFilterProvider } from 'src/exceptions/filters/GlobalExceptionFilter';


@Module({
	imports: [DatabaseModule],
	controllers: [UserController],
	providers: [
		userRepository,
		CreateUserUseCase,
		globalExceptionFilterProvider
	],
	exports: [userRepository]
})
export class UserModule {}
