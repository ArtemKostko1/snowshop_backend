import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../_prisma/prisma.service';
import {
	PrismaClientKnownRequestError,
	PrismaClientValidationError,
} from '@prisma/client/runtime/library';
import { PrismaKnownException } from 'src/common/utils/ExceptionFilter/prismaKnownException';
import { PrismaValidationException } from 'src/common/utils/ExceptionFilter/prismaValidationException';
import { BrandResponse } from './dto/responses/brand.response';
import { BRAND_FIELDS } from 'src/common/constants/brand-fields';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';

@Injectable()
export class BrandService {
	constructor(private readonly prismaService: PrismaService) {}

	// Получение всех брендов
	public async getAllBrands(): Promise<BrandResponse[]> {
		try {
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

	// Получение бренда по идентификатору и возврат его клиенту
	public async getBrandById(id: number): Promise<BrandResponse> {
		try {
			const brand = await this.prismaService.brand.findUnique({
				where: { id },
				select: {
					...BRAND_FIELDS,
				},
			});

			if (!brand) {
				throw new HttpException(
					'Запись с указанным идинетификатором не найдена',
					HttpStatus.NOT_FOUND,
				);
			}

			return brand;
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

	// Создание бренда
	public async createBrand(
		createBrandDto: CreateBrandDto,
	): Promise<BrandResponse> {
		try {
			return await this.prismaService.brand.create({
				data: {
					name: createBrandDto.name,
				},
				select: {
					...BRAND_FIELDS,
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

	// Обновление бренда и возврат его клиенту
	public async updateBrand(
		id: number,
		updateBrandDto: UpdateBrandDto,
	): Promise<BrandResponse> {
		try {
			return await this.prismaService.brand.update({
				where: { id },
				data: updateBrandDto,
				select: {
					...BRAND_FIELDS,
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

	// Удаление бренда и возврат результата удаления клиенту
	public async deleteBrand(id: number): Promise<boolean> {
		try {
			await this.prismaService.brand.delete({
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
