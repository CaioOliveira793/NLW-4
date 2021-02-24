import { SayHelloUseCase } from './SayHelloUseCase';


describe('Say Hello use case', () => {
	it('return "Hello {name}" when called', () => {
		const SayHelloUseCaseInstance = new SayHelloUseCase();

		const result = SayHelloUseCaseInstance.execute({
			name: 'Raiden'
		});
		expect(result).toBe('Hello Raiden!');
	});
});
