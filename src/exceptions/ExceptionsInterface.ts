import { HttpException } from "@nestjs/common";


export interface AppException {
	getHTTPException(): HttpException;
}
