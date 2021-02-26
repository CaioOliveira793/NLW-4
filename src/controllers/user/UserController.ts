import { Body, Controller, HttpCode, HttpException, HttpStatus, Post } from '@nestjs/common';
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
		try {
			return await this.createUserUseCase.execute(data);

		} catch (err) {
			switch (err.type) {
				case 'ALREADY_EXISTS':
					throw new HttpException({
						status: HttpStatus.BAD_REQUEST,
						error: err.message,
					}, HttpStatus.BAD_REQUEST);

				default:
					throw new HttpException({
						status: HttpStatus.INTERNAL_SERVER_ERROR,
						error: err ?? 'Unknown error',
					}, HttpStatus.INTERNAL_SERVER_ERROR);
			}
		}
	}
}
