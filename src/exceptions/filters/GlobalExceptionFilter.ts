import { ArgumentsHost, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { APP_FILTER } from '@nestjs/core';
import { Request, Response } from 'express';
import { AppException } from "../ExceptionsInterface";


export class GlobalExceptionFilter implements ExceptionFilter<unknown> {
	public catch(exception: AppException | Record<string, unknown>, host: ArgumentsHost): void {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const request = ctx.getRequest<Request>();

		if ('getHTTPException' in exception) {
			const httpException = (exception as AppException).getHTTPException();

			const status = httpException.getStatus();

			response
				.status(status)
				.json({
					path: request.url,
					erro: httpException.getResponse(),
				});

		} else {
			response
				.status(HttpStatus.INTERNAL_SERVER_ERROR)
				.json({
					path: request.url,
					erro: 'Internal Server Error',
				});
		}
	}
	
}

export const globalExceptionFilterProvider = {
	provide: APP_FILTER,
	useClass: GlobalExceptionFilter
};
