import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../_prisma/prisma.service';
import { ProductResponse } from './dto/responses/product.response';
import {
	PrismaClientKnownRequestError,
	PrismaClientValidationError,
} from '@prisma/client/runtime/library';
import { PrismaKnownException } from 'src/common/utils/ExceptionFilter/prismaKnownException';
import { PrismaValidationException } from 'src/common/utils/ExceptionFilter/prismaValidationException';
import { CLIENT_PRODUCT_FIELDS } from 'src/common/constants/product-fields';

@Injectable()
export class ProductService {
	constructor(private readonly prismaService: PrismaService) {}

	public async createProduct(
		CreateProductDto: CreateProductDto,
	): Promise<ProductResponse> {
		try {
			// Создание товара и возврат его клиенту
			return await this.prismaService.product.create({
				data: {
					name: CreateProductDto.name,
					price: CreateProductDto.price,
					categoryId: CreateProductDto.categoryId,
					brandId: CreateProductDto.brandId,
					size: CreateProductDto.size,
					article: CreateProductDto.article,
					inStock: CreateProductDto.inStock,
					description: CreateProductDto.description,
					internalCode: CreateProductDto.internalCode,
				},
				// Выборка тех полей, которые нужно вернуть (исключены password и uuid)
				select: {
					...CLIENT_PRODUCT_FIELDS,
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

	// Получение всех товаров и возврат их клиенту
	public async getAllProducts(): Promise<ProductResponse[]> {
		try {
			return await this.prismaService.product.findMany({
				select: {
					...CLIENT_PRODUCT_FIELDS,
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

	// Получение товара по идентификатору и возврат его клиенту
	public async getProductById(id: number): Promise<ProductResponse> {
		try {
			const product = await this.prismaService.product.findUnique({
				where: { id },
				select: {
					...CLIENT_PRODUCT_FIELDS,
				},
			});

			if (!product) {
				throw new HttpException(
					'Запись с указанным идинетификатором не найдена',
					HttpStatus.NOT_FOUND,
				);
			}

			return product;
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

	// public async getUserByUserName(userName: string): Promise<UserDto> {
	// 	try {
	// 		return await this.prismaService.product.findUnique({
	// 			where: { userName },
	// 			select: {
	// 				...APP_USER_FIELDS,
	// 			},
	// 		});
	// 	} catch (error) {
	// 		// Обработка специфических ошибок Prisma
	// 		if (error instanceof PrismaClientKnownRequestError) {
	// 			throw new PrismaKnownException(error);
	// 		} else if (error instanceof PrismaClientValidationError) {
	// 			throw new PrismaValidationException(error);
	// 		}
	// 		// Обработка иных ошибок
	// 		throw error;
	// 	}
	// }

	// Обновление товара и возврат его клиенту
	public async updateProduct(
		id: number,
		updateProductDto: UpdateProductDto,
	): Promise<ProductResponse> {
		try {
			// Обновление пользователя по Id и возврат его клиенту
			return await this.prismaService.product.update({
				where: { id },
				data: updateProductDto,
				// Выборка полей, которые необходимо вернуть клиенту
				select: {
					...CLIENT_PRODUCT_FIELDS,
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

	// Удаление товара и возврат результата удаление клиенту
	public async deleteProduct(id: number): Promise<boolean> {
		try {
			await this.prismaService.product.delete({
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
