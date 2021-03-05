import { TestingModule, Test } from '@nestjs/testing';

import { SendSurveysToUsersUseCase } from './SentSurveysToUsersUseCase';

import { providers } from '../../constants';
import { NodeMailerFakeMailService } from '../../services/mail/NodeMailerFakeMailService';
import { MailService } from '../../services/mail/MailServiceInterface';

import { Survey } from '../../entities/Survey.entity';
import { User } from '../../entities/User.entity';
import { Answer } from '../../entities/Answers.entity';
import { NotFoundException } from '../../exceptions/resource/NotFountException';


const surveyRepositoryMock = {
	findOne(id: string): Promise<Survey | undefined> {
		return new Promise((resolve) => {
			const survey = new Survey('Title', 'Description');
			resolve({ ...survey, id });
		});
	}
}

const userRepositoryMock = {
	findByIds(ids: string[]): Promise<User[]> {
		return new Promise((resolve) => {
			resolve(
				ids.map(
					id => ({ ...new User('first', 'last', 'some@email.com'), id })
				)
			);
		});
	}
}

interface Conditions {
	where: {
		userId: string,
		surveyId: string,
	}
}

const answerRepositoryMock = {
	findOne(conditions: Conditions): Promise<Answer | void> {
		return new Promise((resolve) => {
			resolve(
				new Answer(conditions.where.surveyId, conditions.where.userId)
			);
		});
	},
	insert: (): Promise<void> => new Promise(resolve => resolve())
}

const nodeMailerFakeMailServiceMock: MailService = {
	sendMail: (): Promise<void> => new Promise(resolve => resolve())
}

const surveyId = '1b157e63-4cda-4b51-819d-b135012cd514';


describe('SendSurveysToUsersUseCase', () => {
	let sendSurveysToUsersUseCase: SendSurveysToUsersUseCase;

	beforeEach(async () => {
		const moduleRef: TestingModule = await Test.createTestingModule({
			controllers: [],
			providers: [
				SendSurveysToUsersUseCase,
				{
					provide: providers.surveyRepository,
					useValue: surveyRepositoryMock,
				}, {
					provide: providers.userRepository,
					useValue: userRepositoryMock,
				}, {
					provide: providers.answerRepository,
					useValue: answerRepositoryMock,
				},
				NodeMailerFakeMailService
			],
		})
			.overrideProvider(NodeMailerFakeMailService)
			.useValue(nodeMailerFakeMailServiceMock)
			.compile();

		sendSurveysToUsersUseCase = moduleRef.get<SendSurveysToUsersUseCase>(SendSurveysToUsersUseCase);
	});

	it('send e-mails with surveys', async () => {
		const userIds = [
			'86d5be22-fdf0-4ccc-902b-3cf3a34f1a00',
			'421cccb0-05e9-474a-b12c-7b0611ef2b72',
			'd4432b2d-3ec4-45e8-8d71-4d903de94ba6',
			'b6373706-d8ef-43cb-b437-8439182de658'
		];
		const sendMailSpy = jest.spyOn(nodeMailerFakeMailServiceMock, 'sendMail');
		const answers = await sendSurveysToUsersUseCase.execute({ surveyId, userIds });

		expect(sendMailSpy).toBeCalledTimes(4);
		answers.forEach((answer, index) => {
			expect(answer.surveyId).toBe(surveyId);
			expect(answer.userId).toBe(userIds[index]);
		});

		sendMailSpy.mockRestore();
	});

	it('not send e-mail to any user', async () => {
		const sendMailSpy = jest.spyOn(nodeMailerFakeMailServiceMock, 'sendMail');
		const answers = await sendSurveysToUsersUseCase.execute({ surveyId, userIds: [] });

		expect(sendMailSpy).toBeCalledTimes(0);
		expect(answers).toStrictEqual([]);

		sendMailSpy.mockRestore();
	});

	it('throw a NotFoundException when the survey is not found', async () => {
		const surveyRepoFindOneSpy = jest.spyOn(surveyRepositoryMock, 'findOne')
		.mockImplementation(
			() => new Promise(resolver => resolver(undefined))
		);

		sendSurveysToUsersUseCase.execute({ surveyId, userIds: [] }).catch(err => {
			expect(err)
			.toStrictEqual(new NotFoundException(
				`Survey with id ${surveyId} does not exists`,
				`Survey with id ${surveyId} does not exists, try to create a survey to send to users`
			));
		});

		expect(surveyRepoFindOneSpy).toBeCalledTimes(1);
		surveyRepoFindOneSpy.mockRestore();
	});

	it('create answer if it not exists', async () => {
		const userIds = [
			'86d5be22-fdf0-4ccc-902b-3cf3a34f1a00',
			'421cccb0-05e9-474a-b12c-7b0611ef2b72',
			'd4432b2d-3ec4-45e8-8d71-4d903de94ba6',
			'b6373706-d8ef-43cb-b437-8439182de658'
		];

		const answerRepoFindOneSpy = jest.spyOn(answerRepositoryMock, 'findOne')
			.mockImplementation(() => new Promise(resolver => resolver(undefined)));
		const answerRepoInsertSpy = jest.spyOn(answerRepositoryMock, 'insert')
			.mockImplementation(() => new Promise(resolver => resolver(undefined)));

		await sendSurveysToUsersUseCase.execute({ surveyId, userIds });

		expect(answerRepoFindOneSpy).toBeCalledTimes(4);
		expect(answerRepoInsertSpy).toBeCalledTimes(4);
		answerRepoFindOneSpy.mockRestore();
		answerRepoInsertSpy.mockRestore();
	});

});
