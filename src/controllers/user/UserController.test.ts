import { TestingModule, Test } from '@nestjs/testing';
import { UserController } from './UserController';
import { CreateUserUseCase, CreateUserRequestDTO } from '../../useCases/createUser/CreateUserUseCase';
import { User } from '../../entities/User.entity';


const createUserUseCaseMock = {
	execute(data: CreateUserRequestDTO): Promise<User> {
		return new Promise((resolve) => {
			resolve(new User(data.firstName, data.lastName, data.email));
		});
	}
}

describe('UserController', () => {
	let userController: UserController;

	beforeEach(async () => {
		const moduleRef: TestingModule = await Test.createTestingModule({
			controllers: [UserController],
			providers: [
				CreateUserUseCase,
			],
		})
			.overrideProvider(CreateUserUseCase)
			.useValue(createUserUseCaseMock)
			.compile();

		userController = moduleRef.get<UserController>(UserController);
	});

	it('return the created user', async () => {
		const user = await userController.createUser({
			firstName: 'yeah',
			lastName: 'noe',
			email: 'yeah@noe.com'
		});

		expect(user.firstName).toBe('yeah');
		expect(user.lastName).toBe('noe');
		expect(user.email).toBe('yeah@noe.com');
		expect(user).toHaveProperty('id')
		expect(user).toHaveProperty('createdAt');
	});

});
