import { Injectable } from '@nestjs/common';
import { PrismaService } from '../_prisma/prisma.service';
import { SexResponse } from './dto/response/sex.response';
import {
	PrismaClientKnownRequestError,
	PrismaClientValidationError,
} from '@prisma/client/runtime/library';
import { PrismaKnownException } from '../../common/utils/ExceptionFilter/prismaKnownException';
import { PrismaValidationException } from '../../common/utils/ExceptionFilter/prismaValidationException';

@Injectable()
export class SexService {
	constructor(private readonly prismaService: PrismaService) {}

	public async getAllSex(): Promise<SexResponse[]> {
		try {
			// Выборка всех адресов и возврат их клиенту
			return await this.prismaService.sex.findMany();
		} catch (error) {
			// Обработка специфических ошибок Prisma
			if (error instanceof PrismaClientKnownRequestError) {
				throw new PrismaKnownException(error);
			} else if (error instanceof PrismaClientValidationError) {
				throw new PrismaValidationException(error);
			}
			// Обработка иных ошибок
			throw error;
		}
	}
}
