import { Injectable } from '@nestjs/common';
import { PrismaService } from '../_prisma/prisma.service';
import {
	PrismaClientKnownRequestError,
	PrismaClientValidationError,
} from '@prisma/client/runtime/library';
import { PrismaKnownException } from 'src/common/utils/ExceptionFilter/prismaKnownException';
import { PrismaValidationException } from 'src/common/utils/ExceptionFilter/prismaValidationException';
import { BrandResponse } from './dto/responses/brand.response';

@Injectable()
export class BrandService {
	constructor(private readonly prismaService: PrismaService) {}

	// Получение всех категорий
	public async getAllCategories(): Promise<BrandResponse[]> {
		try {
			// Выборка всех адресов и возврат их клиенту
			return await this.prismaService.brand.findMany();
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
