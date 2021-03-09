import { TestingModule, Test } from '@nestjs/testing';
import { AnswerController } from './AnswerController';

import { InsertAnswerUseCase, InsertAnswerRequestDTO } from '../../useCases/insertAnswer/InsertAnswerUseCase';
import { CalculateNPSUseCase, CalculateNPSResponseDTO
} from '../../useCases/calculateNPS/CalculateNPSUseCase';

import { Answer } from '../../entities/Answers.entity';


const answerId = 'fe8d6de0-5cb0-4949-adda-52d370e09e89';
const surveyId = '8f911c7b-763a-4ff3-badd-558a3b83fa53';

const insertAnswerUseCaseMock = {
	execute(data: InsertAnswerRequestDTO): Promise<Answer> {
		return new Promise((resolve) => {
			const answer = new Answer(surveyId, data.token, data.value);
			resolve({ ...answer, id: answerId });
		});
	}
}

const calculateNPSUseCaseMock = {
	execute(): Promise<CalculateNPSResponseDTO> {
		return new Promise((resolve) => {
			resolve({
				detractors: 2,
				passive: 4,
				promoters: 4,
				percentage: 20,
				total: 10
			});
		});
	}
}


describe('AnswerController', () => {
	let answerController: AnswerController;

	beforeEach(async () => {
		const moduleRef: TestingModule = await Test.createTestingModule({
			controllers: [AnswerController],
			providers: [
				InsertAnswerUseCase,
				CalculateNPSUseCase
			],
		})
			.overrideProvider(InsertAnswerUseCase)
			.useValue(insertAnswerUseCaseMock)
			.overrideProvider(CalculateNPSUseCase)
			.useValue(calculateNPSUseCaseMock)
			.compile();

		answerController = moduleRef.get<AnswerController>(AnswerController);
	});

	it('save the user answer value', async () => {
		const userId = '1b157e63-4cda-4b51-819d-b135012cd514';
		const answer = await answerController.createAnswer(answerId, { v: 9, tk: userId });

		expect(answer.id).toBe(answerId);
		expect(answer.surveyId).toBe(surveyId);
		expect(answer.userId).toBe(userId);
		expect(answer.answer).toBe(9);
	});

	it('return listed surveys', async () => {
		const NPSData = await answerController.calculateNPS(surveyId);

		expect(NPSData).toStrictEqual({
			detractors: 2,
			passive: 4,
			promoters: 4,
			percentage: 20,
			total: 10
		});
	});

});
