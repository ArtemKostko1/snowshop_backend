import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
	PrismaClientKnownRequestError,
	PrismaClientValidationError,
} from '@prisma/client/runtime/library';
import { PrismaKnownException } from 'src/common/utils/ExceptionFilter/prismaKnownException';
import { PrismaValidationException } from 'src/common/utils/ExceptionFilter/prismaValidationException';
import { CategoryResponse } from './dto/responses/category.response';
import { PrismaService } from '../_prisma/prisma.service';
import { CATEGORY_FIELDS } from 'src/common/constants/category-fields';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
	constructor(private readonly prismaService: PrismaService) {}

	// Получение всех категорий
	public async getAllCategories(): Promise<CategoryResponse[]> {
		try {
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

	// Получение категории по идентификатору и возврат его клиенту
	public async getCategoryById(id: number): Promise<CategoryResponse> {
		try {
			const category = await this.prismaService.category.findUnique({
				where: { id },
				select: {
					...CATEGORY_FIELDS,
				},
			});

			if (!category) {
				throw new HttpException(
					'Запись с указанным идинетификатором не найдена',
					HttpStatus.NOT_FOUND,
				);
			}

			return category;
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

	// Создание категории
	public async createCategory(
		createCategoryDto: CreateCategoryDto,
	): Promise<CategoryResponse> {
		try {
			return await this.prismaService.category.create({
				data: {
					name: createCategoryDto.name,
					value: createCategoryDto.value,
				},
				select: {
					...CATEGORY_FIELDS,
				},
			});
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

	// Обновление категории и возврат его клиенту
	public async updateCategory(
		id: number,
		updateCategoryDto: UpdateCategoryDto,
	): Promise<CategoryResponse> {
		try {
			return await this.prismaService.category.update({
				where: { id },
				data: updateCategoryDto,
				select: {
					...CATEGORY_FIELDS,
				},
			});
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

	// Удаление категории и возврат результата удаления клиенту
	public async deleteCategory(id: number): Promise<boolean> {
		try {
			await this.prismaService.category.delete({
				where: { id },
			});
			return true;
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
