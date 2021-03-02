import { AppException } from '../ExceptionsInterface';
import { HttpException, HttpStatus } from '@nestjs/common';


export class AlreadyExistsException implements AppException {
	private message: string;
	private details: unknown;

	constructor(message: string, details?: unknown) {
		this.message = message;
		this.details = details;
	}

	public getHTTPException(): HttpException {
		return new HttpException({
			status: HttpStatus.BAD_REQUEST,
			message: this.message,
			details: this.details,
		}, HttpStatus.BAD_REQUEST);
	}
}
