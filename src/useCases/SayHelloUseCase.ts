import { Injectable } from "@nestjs/common";

export interface SayHelloRequestDTO {
	name?: string;
}

@Injectable()
export class SayHelloUseCase {
	public execute(data: SayHelloRequestDTO): string {
		return `Hello ${data.name ?? 'anonymous'}!`;
	}
}
