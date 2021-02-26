import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { providers } from "../../constants";
import { User } from "../../entities/User.entity";

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
		try {
			const user = new User(data.firstName, data.lastName, data.email);

			const userAlreadyExists = await this.userRepository.findOne({
				where: { email: user.email }
			});

			if (userAlreadyExists) {
				throw {
					type: 'ALREADY_EXISTS',
					message: `User with email ${user.email} already exists`
				}
			}

			await this.userRepository.insert(user);
			return user;
		} catch (err) {
			switch (err.type) {
				case 'ALREADY_EXISTS':
					throw err;

				default:
					throw new Error('Unknown error');
			}
		}
	}

}
