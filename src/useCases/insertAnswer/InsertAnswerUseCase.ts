import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Answers } from "../../entities/Answers.entity";
import { providers } from "../../constants";
import { NotFoundException } from "src/exceptions/resource/NotFountException";
import { UnauthorizedException } from "src/exceptions/permission/UnauthorizedException";
import { MalformatedException } from "src/exceptions/resource/MalformatedException";


export interface InsertAnswerRequestDTO {
	answerId: string;
	token: string;
	value: number;
}


@Injectable()
export class InsertAnswerUseCase {
	constructor(
		@Inject(providers.answerRepository)
		private readonly answerRepository: Repository<Answers>,
	) {}

	public async execute(data: InsertAnswerRequestDTO): Promise<Answers> {
		const answer = await this.answerRepository.findOne(data.answerId);

		if (!answer) {
			throw new NotFoundException(
				`Answer with id ${data.answerId} does not exists`
			);
		}
		if (answer.userId !== data.token) {
			throw new UnauthorizedException(`Token ${data.token} is not valid`);
		}
		if (data.value < 0 || data.value > 10) {
			throw new MalformatedException(
				`Answer value ${data.value} is out of bounds (0 < value < 10)`
			);
		}

		answer.answer = Math.floor(data.value);
		this.answerRepository.update({ id: answer.id }, { answer: answer.answer });
		return answer;
	}

}
