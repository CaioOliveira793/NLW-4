import { Body, Controller, HttpCode, Post } from '@nestjs/common';

import { User } from '../../entities/User.entity';
import { CreateUserUseCase } from '../../useCases/createUser/CreateUserUseCase';

import { createUserBodySchema } from '../../validation/user/CreateUser';
import { ValidationPipe } from '../../pipes/ValidationPipe';


export interface CreateUserBody {
	firstName: string;
	lastName: string;
	email: string;
}


@Controller('/users')
export class UserController {
	constructor(
		private readonly createUserUseCase: CreateUserUseCase
	) {}

	@Post()
	@HttpCode(201)
	async createUser(
		@Body(new ValidationPipe(createUserBodySchema)) data: CreateUserBody
	): Promise<User> {
		return await this.createUserUseCase.execute(data);
	}

}
