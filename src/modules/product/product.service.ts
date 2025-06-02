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
import { PRODUCT_FIELDS } from 'src/common/constants/product-fields';

@Injectable()
export class ProductService {
	constructor(private readonly prismaService: PrismaService) {}

	private transformProduct(product: any): ProductResponse {
		return {
			...product,
			images: Array.isArray(product.images)
				? product.images.map((img) => img.url)
				: [],
		};
	}

	// Создание товара
	public async createProduct(
		createProductDto: CreateProductDto,
	): Promise<ProductResponse> {
		try {
			const product = await this.prismaService.product.create({
				data: {
					...createProductDto,
					images: createProductDto.images.map((image) => ({
						url: image,
					})),
				},
				select: {
					...PRODUCT_FIELDS,
				},
			});
			return this.transformProduct(product);
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
			const products = await this.prismaService.product.findMany({
				where: {
					isDeleted: false,
				},
				select: {
					...PRODUCT_FIELDS,
				},
			});
			return products.map((product) => this.transformProduct(product));
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
			const product = await this.prismaService.product.findFirst({
				where: {
					id,
					isDeleted: false,
				},
				select: {
					...PRODUCT_FIELDS,
				},
			});

			if (!product) {
				throw new HttpException(
					'Запись с указанным идинетификатором не найдена',
					HttpStatus.NOT_FOUND,
				);
			}

			return this.transformProduct(product);
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

	// Обновление товара и возврат его клиенту
	public async updateProduct(
		id: number,
		updateProductDto: UpdateProductDto,
	): Promise<ProductResponse> {
		try {
			const product = await this.prismaService.product.update({
				where: { id },
				data: {
					...updateProductDto,
					images: updateProductDto.images.map((image) => ({
						url: image,
					})),
				},
				select: {
					...PRODUCT_FIELDS,
				},
			});
			return this.transformProduct(product);
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
			await this.prismaService.product.update({
				where: { id },
				data: {
					isDeleted: true,
					deletedAt: new Date(),
				},
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
