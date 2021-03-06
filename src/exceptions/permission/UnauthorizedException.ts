import { HttpException, HttpStatus } from '@nestjs/common';
import { AppException } from '../ExceptionsInterface';


export class UnauthorizedException implements AppException {
	private message: string;
	private details: unknown;

	constructor(message: string, details?: unknown) {
		this.message = message;
		this.details = details;
	}

	public getHTTPException(): HttpException {
		return new HttpException({
			status: HttpStatus.UNAUTHORIZED,
			message: this.message,
			details: this.details,
		}, HttpStatus.UNAUTHORIZED);
	}

}
