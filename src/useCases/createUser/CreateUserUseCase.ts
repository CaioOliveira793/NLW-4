import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "../../entities/User.entity";
import { providers } from "../../constants";
import { AlreadyExistsException } from '../../exceptions/resource/AlreadyExistsException';

export interface CreateUserRequestDTO {
	firstName: string,
	lastName: string,
	email: string
}

@Injectable()
export class CreateUserUseCase {
	constructor(
		@Inject(providers.userRepository)
		private readonly userRepository: Repository<User>
	) {}

	public async execute(data: CreateUserRequestDTO): Promise<User> {
		const user = new User(data.firstName, data.lastName, data.email);

		const userAlreadyExists = await this.userRepository.findOne({
			where: { email: user.email }
		});

		if (userAlreadyExists) {
			throw new AlreadyExistsException(
				`User with email ${user.email} already exists`,
				`The email ${user.email} is in use, if this is your account, try to reset your password.`
			);
		}

		await this.userRepository.insert(user);
		return user;
	}

}
