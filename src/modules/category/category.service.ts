import { Injectable } from '@nestjs/common';
import {
	PrismaClientKnownRequestError,
	PrismaClientValidationError,
} from '@prisma/client/runtime/library';
import { PrismaKnownException } from 'src/common/utils/ExceptionFilter/prismaKnownException';
import { PrismaValidationException } from 'src/common/utils/ExceptionFilter/prismaValidationException';
import { CategoryResponse } from './dto/responses/category.response';
import { PrismaService } from '../_prisma/prisma.service';

@Injectable()
export class CategoryService {
	constructor(private readonly prismaService: PrismaService) {}

	// Получение всех категорий
	public async getAllCategories(): Promise<CategoryResponse[]> {
		try {
			// Выборка всех адресов и возврат их клиенту
			return await this.prismaService.category.findMany();
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
