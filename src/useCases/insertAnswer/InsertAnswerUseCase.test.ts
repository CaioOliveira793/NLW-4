import { TestingModule, Test } from '@nestjs/testing';

import { InsertAnswerUseCase } from './InsertAnswerUseCase';
import { Answer } from '../../entities/Answers.entity';

import { providers } from '../../constants';
import { NotFoundException } from '../../exceptions/resource/NotFountException';
import { UnauthorizedException } from '../../exceptions/permission/UnauthorizedException';
import { MalformatedException } from '../../exceptions/resource/MalformatedException';


const answerId = '1b157e63-4cda-4b51-819d-b135012cd514';
const surveyId = 'a6ea9933-4964-4792-bed3-80d2eb56a895';
const userId = '9ec9a349-20b4-4838-95c1-2cc5a4ed444d';

const answerRepositoryMock = {
	findOne: (id: string): Promise<Answer | void> =>
		new Promise(resolve => resolve({
			...new Answer(surveyId, userId),
			id
		})),
	update: (): Promise<void> => new Promise(resolve => resolve())
}


describe('InsertAnswerUseCase', () => {
	let insertAnswerUseCase: InsertAnswerUseCase;

	beforeEach(async () => {
		const moduleRef: TestingModule = await Test.createTestingModule({
			controllers: [],
			providers: [
				InsertAnswerUseCase,
				{
					provide: providers.answerRepository,
					useValue: answerRepositoryMock,
				}
			],
		}).compile();

		insertAnswerUseCase = moduleRef.get<InsertAnswerUseCase>(InsertAnswerUseCase);
	});


	it('insert a value in answer', async () => {
		const answer = await insertAnswerUseCase.execute({
			answerId,
			token: userId,
			value: 1
		});

		expect(answer.answer).toBe(1);
	});

	it('throw a NotFoundException when the answer is not found', async () => {
		const surveyRepoFindOneSpy = jest.spyOn(answerRepositoryMock, 'findOne')
			.mockImplementation(() => new Promise(resolver => resolver(undefined)));

		insertAnswerUseCase.execute({ answerId, token: userId, value: 5 }).catch(err => {
			expect(err)
				.toStrictEqual(new NotFoundException(`Answer with id ${answerId} does not exists`));
		});

		expect(surveyRepoFindOneSpy).toBeCalledTimes(1);
		surveyRepoFindOneSpy.mockRestore();
	});

	it('throw a UnauthorizedException when the token is not a user id', async () => {
		insertAnswerUseCase.execute({
			answerId,
			token: 'not a valid user id',
			value: 5
		}).catch(err => {
			expect(err)
			.toStrictEqual(
				new UnauthorizedException('Token not a valid user id is not valid')
			);
		});
	});

	it('throw a MalformatedException when the value is not valid', async () => {
		insertAnswerUseCase.execute({
			answerId,
			token: userId,
			value: 11
		}).catch(err => {
			expect(err)
			.toStrictEqual(
				new MalformatedException(`Answer value 11 is out of bounds (0 < value < 10)`)
			);
		});

		insertAnswerUseCase.execute({
			answerId,
			token: userId,
			value: -4
		}).catch(err => {
			expect(err)
			.toStrictEqual(
				new MalformatedException(`Answer value -4 is out of bounds (0 < value < 10)`)
			);
		});
	});

});
