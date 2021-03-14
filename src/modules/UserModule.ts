import { Module } from '@nestjs/common';

import { DatabaseModule } from './DatabaseModule';

import { UserController } from '../controllers/user/UserController';
import { userRepository } from '../repositories/UserRepository';

import { CreateUserUseCase } from '../useCases/createUser/CreateUserUseCase';


@Module({
	imports: [DatabaseModule],
	controllers: [UserController],
	providers: [
		userRepository,
		CreateUserUseCase
	],
	exports: [userRepository]
})
export class UserModule {}
