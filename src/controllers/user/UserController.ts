import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { User } from '../../entities/User.entity';
import { CreateUserRequestDTO, CreateUserUseCase } from '../../useCases/createUser/CreateUserUseCase';
import { createUserRequestDTOSchema } from '../../useCases/createUser/CreateUserDTOValidation';
import { JoiValidationPipe } from '../../pipes/JoiValidationPipe';


export type CreateUserBody = CreateUserRequestDTO;

@Controller('/users')
export class UserController {
	constructor(
		private readonly createUserUseCase: CreateUserUseCase
	) {}

	@Post()
	@HttpCode(201)
	async createUser(
		@Body(new JoiValidationPipe(createUserRequestDTOSchema)) data: CreateUserBody
	): Promise<User> {
		return await this.createUserUseCase.execute(data);
	}

}
