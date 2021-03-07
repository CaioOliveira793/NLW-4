import { TestingModule, Test } from '@nestjs/testing';

import { CreateSurveyUseCase } from './CreateSurveyUseCase';
import { providers } from '../../constants';


const surveyRepositoryMock = {
	insert: (): Promise<void> => new Promise(resolve => resolve())
}


describe('CreateSurveyUseCase', () => {
	let createSurveyUseCase: CreateSurveyUseCase;

	beforeEach(async () => {
		const moduleRef: TestingModule = await Test.createTestingModule({
			controllers: [],
			providers: [
				CreateSurveyUseCase,
				{
					provide: providers.surveyRepository,
					useValue: surveyRepositoryMock,
				}
			],
		}).compile();

		createSurveyUseCase = moduleRef.get<CreateSurveyUseCase>(CreateSurveyUseCase);
	});


	it('create and save a new Survey', async () => {
		const surveyRepoInsertSpy = jest.spyOn(surveyRepositoryMock, 'insert');

		const survey = await createSurveyUseCase.execute({
			title: 'The Title',
			description: 'Description'
		});

		expect(surveyRepoInsertSpy).toBeCalledTimes(1);
		surveyRepoInsertSpy.mockRestore();

		expect(survey.title).toBe('The Title');
		expect(survey.description).toBe('Description');
	});

});
