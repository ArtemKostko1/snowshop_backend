import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../_prisma/prisma.service';
import { CatalogProductResponse } from './dto/responses/catalog.response';
import {
	PrismaClientKnownRequestError,
	PrismaClientValidationError,
} from '@prisma/client/runtime/library';
import { PrismaKnownException } from 'src/common/utils/ExceptionFilter/prismaKnownException';
import { PrismaValidationException } from 'src/common/utils/ExceptionFilter/prismaValidationException';
import { PRODUCT_FIELDS } from 'src/common/constants/product-fields';

@Injectable()
export class CatalogService {
	constructor(private readonly prismaService: PrismaService) {}

	private transformProduct(product: any): CatalogProductResponse {
		return {
			...product,
			images: Array.isArray(product.images)
				? product.images.map((img) => img.url)
				: [],
		};
	}

	// Приватный метод для группировки товаров по internalCode и формирования массива size
	private groupProductsByInternalCode(products: any[]): any[] {
		const productMap = new Map<string, any>();
		for (const product of products) {
			const key = product.internalCode;
			if (!productMap.has(key)) {
				productMap.set(key, {
					...product,
					size: product.size ? [product.size] : [],
				});
			} else {
				const existing = productMap.get(key);
				if (product.size && !existing.size.includes(product.size)) {
					existing.size.push(product.size);
				}
				existing.inStock = existing.inStock || product.inStock;
			}
		}
		return Array.from(productMap.values());
	}

	// Получение всех товаров каталога и возврат их клиенту
	public async getAllCatalogProducts(): Promise<CatalogProductResponse[]> {
		try {
			const products = await this.prismaService.product.findMany({
				select: {
					...PRODUCT_FIELDS,
				},
			});

			const uniqueProducts = this.groupProductsByInternalCode(
				products,
			).map((product) => this.transformProduct(product));
			return uniqueProducts;
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

	// Получение товара по артиклу запроса и возврат его клиенту
	public async getProductByArticleRoute(
		articleRoute: string,
	): Promise<CatalogProductResponse> {
		try {
			const products = await this.prismaService.product.findMany({
				where: { articleRoute },
				select: {
					...PRODUCT_FIELDS,
				},
			});

			if (!products || products.length === 0) {
				throw new HttpException(
					'Запись с указанным артикулом не найдена',
					HttpStatus.NOT_FOUND,
				);
			}

			const uniqueProducts = this.groupProductsByInternalCode(products);
			const uniqueProduct = uniqueProducts[0];
			return this.transformProduct(uniqueProduct);
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

	// Получение товаров по категории
	public async getProductsByCategory(
		categoryName: string,
	): Promise<CatalogProductResponse[]> {
		try {
			const products = await this.prismaService.product.findMany({
				where: { category: { value: categoryName } },
				select: {
					...PRODUCT_FIELDS,
				},
			});

			if (!products || products.length === 0) {
				throw new HttpException(
					'Товары указанной категории не найдены',
					HttpStatus.NOT_FOUND,
				);
			}

			const uniqueProducts = this.groupProductsByInternalCode(
				products,
			).map((product) => this.transformProduct(product));
			return uniqueProducts;
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
