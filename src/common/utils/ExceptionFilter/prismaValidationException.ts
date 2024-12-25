import { HttpException, HttpStatus } from '@nestjs/common';
import { PrismaClientValidationError } from '@prisma/client/runtime/library';
import { log } from 'console';

export class PrismaValidationException extends HttpException {
	constructor(error: PrismaClientValidationError) {
		const message = 'Произошла ошибка с валидацией данных';
		let status = HttpStatus.BAD_REQUEST;
		log('Произошла ошибка с валидацией данных: ', error);
		super(message, status);
	}
}
