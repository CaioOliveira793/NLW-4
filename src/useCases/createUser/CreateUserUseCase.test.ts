import { TestingModule, Test } from '@nestjs/testing';

import { CreateUserUseCase } from './CreateUserUseCase';
import { User } from '../../entities/User.entity';

import { providers } from '../../constants';
import { AlreadyExistsException } from '../../exceptions/resource/AlreadyExistsException';


const userRepositoryMock = {
	findOne: (): Promise<User | void> => new Promise(resolve => resolve()),
	insert: (): Promise<void> => new Promise(resolve => resolve())
}


describe('CreateUserUseCase', () => {
	let createUserUseCase: CreateUserUseCase;

	beforeEach(async () => {
		const moduleRef: TestingModule = await Test.createTestingModule({
			controllers: [],
			providers: [
				CreateUserUseCase,
				{
					provide: providers.userRepository,
					useValue: userRepositoryMock,
				}
			],
		}).compile();

		createUserUseCase = moduleRef.get<CreateUserUseCase>(CreateUserUseCase);
	});


	it('create and save a new User', async () => {
		const userRepoInsertSpy = jest.spyOn(userRepositoryMock, 'insert');

		const user = await createUserUseCase.execute({
			firstName: 'firstName',
			lastName: 'lastName',
			email: 'my@email.com'
		});

		expect(userRepoInsertSpy).toBeCalledTimes(1);
		userRepoInsertSpy.mockRestore();

		expect(user.firstName).toBe('firstName');
		expect(user.lastName).toBe('lastName');
		expect(user.email).toBe('my@email.com');
	});

	it('throw a AlreadyExistsException when the user email already exists', async () => {
		const userRepoFindOneSpy = jest.spyOn(userRepositoryMock, 'findOne');

		createUserUseCase.execute({
			firstName: 'firstName',
			lastName: 'lastName',
			email: 'my@email.com'
		}).catch(err => {
			expect(err).toStrictEqual(new AlreadyExistsException(
				'User with email my@email.com already exists',
				'The email my@email.com is in use, if this is your account, try to reset your password'
			));

			expect(userRepoFindOneSpy).toBeCalledTimes(1);
			userRepoFindOneSpy.mockRestore();
		});
	});

});
