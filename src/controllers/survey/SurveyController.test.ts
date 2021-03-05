import { TestingModule, Test } from '@nestjs/testing';
import { SurveyController } from './SurveyController';

import { CreateSurveyUseCase, CreateSurveyRequestDTO } from "../../useCases/createSurvey/CreateSurveyUseCase";
import { ListSurveysUseCase, ListSurveysRequestDTO } from "../../useCases/listSurveys/ListSurveysUseCase";
import { SendSurveysToUsersUseCase, SendSurveysToUsersRequestDTO
} from "../../useCases/sendSurveysToUsers/SentSurveysToUsersUseCase";

import { Survey } from '../../entities/Survey.entity';
import { Answer } from '../../entities/Answers.entity';


const createSurveyUseCaseMock = {
	execute(data: CreateSurveyRequestDTO): Promise<Survey> {
		return new Promise((resolve) => {
			resolve(new Survey(data.title, data.description));
		});
	}
}

const listSurveyUseCaseMock = {
	execute(data: ListSurveysRequestDTO): Promise<Survey[]> {
		return new Promise((resolve) => {
			resolve([
				new Survey(
					data.title ?? 'Some survey title',
					data.description ?? 'The description'
				),
				new Survey(
					data.title ?? 'Some survey title',
					data.description ?? 'The description'
				),
			]);
		});
	}
}

const sendSurveysToUsersUseCaseMock = {
	execute(data: SendSurveysToUsersRequestDTO): Promise<Answer[]> {
		return new Promise((resolve) => {
			const answers = data.userIds.map(userId =>
				new Answer(data.surveyId, userId));
			resolve(answers);
		});
	}
}


describe('SurveyController', () => {
	let surveyController: SurveyController;

	beforeEach(async () => {
		const moduleRef: TestingModule = await Test.createTestingModule({
			controllers: [SurveyController],
			providers: [
				CreateSurveyUseCase,
				ListSurveysUseCase,
				SendSurveysToUsersUseCase
			],
		})
			.overrideProvider(CreateSurveyUseCase)
			.useValue(createSurveyUseCaseMock)
			.overrideProvider(ListSurveysUseCase)
			.useValue(listSurveyUseCaseMock)
			.overrideProvider(SendSurveysToUsersUseCase)
			.useValue(sendSurveysToUsersUseCaseMock)
			.compile();

		surveyController = moduleRef.get<SurveyController>(SurveyController);
	});

	it('return the created survey', async () => {
		const survey = await surveyController.createSurveys({
			title: 'Some survey title',
			description: 'The description'
		});

		expect(survey.title).toBe('Some survey title');
		expect(survey.description).toBe('The description');
		expect(survey).toHaveProperty('id');
		expect(survey).toHaveProperty('createdAt');
	});

	it('return listed surveys', async () => {
		const surveys = await surveyController.listSurveys({
			title: 'Other survey title',
			description: 'description ...'
		});

		expect(surveys.length).toBe(2);
		surveys.forEach(survey => {
			expect(survey.title).toBe('Other survey title');
			expect(survey.description).toBe('description ...');
			expect(survey).toHaveProperty('id');
			expect(survey).toHaveProperty('createdAt');
		});
	});

	it('return listed surveys', async () => {
		const userIds = [
			'88abaf5c-2b3e-48a0-ae5e-74ec9b8dd00e',
			'ac9de291-9816-464c-9088-afdad99d2e32',
			'9b2a3eba-37cc-4d47-a025-c28b0fb7f058',
			'03d38f79-96a6-4186-8111-3e214f981516'
		];
		const answers = await surveyController.sendSurvey({
			surveyId: '3deb6801-ee55-4121-a13a-db808702388b',
			userIds
		});

		expect(answers.length).toBe(4);
		answers.forEach((answer, index) => {
			expect(answer.surveyId).toBe('3deb6801-ee55-4121-a13a-db808702388b');
			expect(answer.userId).toBe(userIds[index]);
			expect(answer).toHaveProperty('id');
			expect(answer).toHaveProperty('createdAt');
		});
	});

});
