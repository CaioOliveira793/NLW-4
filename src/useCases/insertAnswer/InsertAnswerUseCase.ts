import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Answer } from "../../entities/Answers.entity";
import { providers } from "../../constants";
import { NotFoundException } from "../../exceptions/resource/NotFountException";
import { UnauthorizedException } from "../../exceptions/permission/UnauthorizedException";
import { MalformatedException } from "../../exceptions/resource/MalformatedException";


export interface InsertAnswerRequestDTO {
	answerId: string;
	token: string;
	value: number;
}


@Injectable()
export class InsertAnswerUseCase {
	constructor(
		@Inject(providers.answerRepository)
		private readonly answerRepository: Repository<Answer>,
	) {}

	public async execute(data: InsertAnswerRequestDTO): Promise<Answer> {
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
		await this.answerRepository.update({ id: answer.id }, { answer: answer.answer });
		return answer;
	}

}
