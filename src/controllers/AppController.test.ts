import { AppController } from './AppController';
import { TestingModule, Test } from '@nestjs/testing';
import { SayHelloUseCase } from '../useCases/SayHelloUseCase';



describe('AppController', () => {
	let appController: AppController;

	beforeEach(async () => {
		const app: TestingModule = await Test.createTestingModule({
			controllers: [AppController],
			providers: [SayHelloUseCase],
		}).compile();

		appController = app.get<AppController>(AppController);
	});

	it('should return "Hello Caio!"', () => {
		expect(appController.getHello({ name: 'Caio' })).toBe('Hello Caio!');
	});
});
