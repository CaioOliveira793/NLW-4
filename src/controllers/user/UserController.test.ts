import { TestingModule, Test } from '@nestjs/testing';
import { UserController } from './UserController';
import { CreateUserUseCase } from '../../useCases/createUser/CreateUserUseCase';
import { userRepository } from '../../repositories/UserRepository';
import { DatabaseModule } from '../../modules/DatabaseModule';



describe('UserController', () => {
	let userController: UserController;

	beforeEach(async () => {
		const app: TestingModule = await Test.createTestingModule({
			imports: [DatabaseModule],
			controllers: [UserController],
			providers: [CreateUserUseCase, userRepository],
		}).compile();

		userController = app.get<UserController>(UserController);
	});

	it('should return the first name', async () => {
		expect((await userController.createUser({
			firstName: 'yeah',
			lastName: 'noe',
			email: 'yeah@noe.com'
		})).firstName).toBe('yeah');
	});
});
