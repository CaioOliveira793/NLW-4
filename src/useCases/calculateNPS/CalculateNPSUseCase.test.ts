import { TestingModule, Test } from '@nestjs/testing';

import { CalculateNPSUseCase } from './CalculateNPSUseCase';
import { Survey } from '../../entities/Survey.entity';
import { Answer } from '../../entities/Answers.entity';

import { providers } from '../../constants';
import { NotFoundException } from '../../exceptions/resource/NotFountException';
import { ConflictException } from '../../exceptions/resource/ConflictException';


const surveyId = 'a6ea9933-4964-4792-bed3-80d2eb56a895';
const userId = '9ec9a349-20b4-4838-95c1-2cc5a4ed444d';


const answerRepositoryMock = {
	findOne: (id: string): Promise<Answer | void> =>
		new Promise(resolve => resolve({
			...new Answer(surveyId, userId),
			id
		})),
	count(): Promise<number> {
		return new Promise(resolve => resolve(23));
	}
}

const surveyRepositoryMock = {
	findOne: (id: string): Promise<Survey | void> =>
		new Promise(resolve => resolve({
			...new Survey('Title', 'Description'),
			id
		})),
}


describe('CalculateNPSUseCase', () => {
	let calculateNPSUseCase: CalculateNPSUseCase;

	beforeEach(async () => {
		const moduleRef: TestingModule = await Test.createTestingModule({
			controllers: [],
			providers: [
				CalculateNPSUseCase,
				{
					provide: providers.answerRepository,
					useValue: answerRepositoryMock,
				}, {
					provide: providers.surveyRepository,
					useValue: surveyRepositoryMock,
				}
			],
		}).compile();

		calculateNPSUseCase = moduleRef.get<CalculateNPSUseCase>(CalculateNPSUseCase);
	});


	it('calculate the NPS', async () => {
		const NPSResult = await calculateNPSUseCase.execute({ surveyId });

		expect(NPSResult).toStrictEqual({
			detractors: 23,
			passive: 23,
			percentage: 0,
			promoters: 23,
			total: 69,
		});
	});

	it('throw a NotFoundException when the answer is not found', async () => {
		const answerRepoFindOneSpy = jest.spyOn(answerRepositoryMock, 'findOne')
			.mockImplementation(() => null as unknown as Promise<void>);

		const surveyRepoFindOneSpy = jest.spyOn(surveyRepositoryMock, 'findOne')
			.mockImplementation(() => null as unknown as Promise<void>);

		calculateNPSUseCase.execute({ surveyId }).catch(err => {
			expect(err).toStrictEqual(new NotFoundException(
				`Survey with id ${surveyId} does not exists`,
				`Survey with id ${surveyId} does not exists, try to create a survey to send to users`
			));
			expect(answerRepoFindOneSpy).toBeCalledTimes(1);
			expect(surveyRepoFindOneSpy).toBeCalledTimes(1);

			answerRepoFindOneSpy.mockRestore();
			surveyRepoFindOneSpy.mockRestore();
		});
	});

	it('throw a ConflictException when the queried survey is not sent to any user', async () => {
		const answerRepoFindOneSpy = jest.spyOn(answerRepositoryMock, 'findOne')
			.mockImplementation(() => null as unknown as Promise<void>);

		calculateNPSUseCase.execute({ surveyId }).catch(err => {
			expect(err).toStrictEqual(new ConflictException(
				`Survey with id ${surveyId} was not sended to any User`,
				`Try to send the survey with id ${surveyId} to Users and resend the request`
			));
			expect(answerRepoFindOneSpy).toBeCalledTimes(1);

			answerRepoFindOneSpy.mockRestore();
		});
	});

});
