import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { User } from '../../entities/User.entity';
import { CreateUserRequestDTO, CreateUserUseCase } from '../../useCases/createUser/CreateUserUseCase';


@Controller('/users')
export class UserController {
	constructor(
		private readonly createUserUseCase: CreateUserUseCase
	) {}

	@Post()
	@HttpCode(201)
	async createUser(@Body() data: CreateUserRequestDTO): Promise<User> {
		return await this.createUserUseCase.execute(data);
	}
}
