import {
	ExceptionFilter,
	Catch,
	Injectable,
	ArgumentsHost,
	HttpException,
	HttpStatus,
} from '@nestjs/common';
import { error, log } from 'console';
import { Request, Response } from 'express';

interface ErrorResponseType {
	message?: string;
}

@Catch()
@Injectable()
export class GLobalExceptionFilter implements ExceptionFilter {
	catch(exception: unknown, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const request = ctx.getRequest<Request>();
		const status =
			exception instanceof HttpException
				? exception.getStatus()
				: HttpStatus.INTERNAL_SERVER_ERROR;

		let message;
		if (exception instanceof HttpException) {
			const responseMessage =
				exception.getResponse() as ErrorResponseType;
			message =
				typeof responseMessage === 'object' && responseMessage.message
					? 'Внутренняя ошибка сервера'
					: responseMessage;
		}

		if (status === HttpStatus.UNAUTHORIZED) {
			message = 'Неавторизованный доступ';
		} else if (status === HttpStatus.FORBIDDEN) {
			message = 'Доступ запрещён';
		}

		response.status(status).json({
			statusCode: status,
			timestamp: new Date().toISOString(),
			path: request.url,
			message,
		});

		log(`${message}: STATUS - ${status}. ${error}`);
	}
}
