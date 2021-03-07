import { TestingModule, Test } from '@nestjs/testing';

import { ListSurveysUseCase } from './ListSurveysUseCase';
import { Survey } from '../../entities/Survey.entity';

import { providers } from '../../constants';


const surveyRepositoryMock = {
	find: (): Promise<Survey[]> => new Promise(resolve => {
		const surveyList = [
			new Survey('The Title', 'Description')
		];
		resolve(surveyList);
	})
}


describe('ListSurveysUseCase', () => {
	let listSurveysUseCase: ListSurveysUseCase;

	beforeEach(async () => {
		const moduleRef: TestingModule = await Test.createTestingModule({
			controllers: [],
			providers: [
				ListSurveysUseCase,
				{
					provide: providers.surveyRepository,
					useValue: surveyRepositoryMock,
				}
			],
		}).compile();

		listSurveysUseCase = moduleRef.get<ListSurveysUseCase>(ListSurveysUseCase);
	});


	it('list the existing Surveys', async () => {
		const surveyRepoFindSpy = jest.spyOn(surveyRepositoryMock, 'find');

		const surveyList = await listSurveysUseCase.execute({
			title: 'The Title',
			description: 'Description'
		});

		expect(surveyList.length).toBeLessThanOrEqual(20);
		expect(surveyRepoFindSpy).toBeCalledTimes(1);
		surveyRepoFindSpy.mockRestore();
	});

});
