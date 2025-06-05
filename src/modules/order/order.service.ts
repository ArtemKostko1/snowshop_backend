import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from '../_prisma/prisma.service';
import { OrderResponse } from './dto/responses/order.response';
import {
	PrismaClientKnownRequestError,
	PrismaClientValidationError,
} from '@prisma/client/runtime/library';
import { PrismaKnownException } from 'src/common/utils/ExceptionFilter/prismaKnownException';
import { PrismaValidationException } from 'src/common/utils/ExceptionFilter/prismaValidationException';

@Injectable()
export class OrderService {
	constructor(private readonly prismaService: PrismaService) {}

	// Создание заказа
	public async createOrder(
		createOrderDto: CreateOrderDto,
	): Promise<OrderResponse> {
		try {
			// Получаем информацию о товарах для заказа
			const orderItems = await Promise.all(
				createOrderDto.orderItems.map(async (item) => {
					const product = await this.prismaService.product.findFirst({
						where: {
							internalCode: item.productInternalCode,
							size: item.productSize,
							isDeleted: false,
						},
					});

					if (!product) {
						throw new HttpException(
							`Товар с внутренним кодом ${item.productInternalCode} и размером ${item.productSize} не найден`,
							HttpStatus.NOT_FOUND,
						);
					}

					return {
						productId: product.id,
						quantity: item.quantity,
						price: product.price,
						productName: product.name,
						productArticle: product.article,
						productInternalCode: product.internalCode,
						productSize: product.size,
						productImage:
							Array.isArray(product.images) &&
							product.images.length > 0
								? (product.images[0] as any).url ||
									String(product.images[0])
								: '',
					};
				}),
			);

			// Рассчитываем общую стоимость заказа
			const totalPrice = orderItems.reduce(
				(sum, item) => sum + item.price * item.quantity,
				0,
			);

			// Создаем заказ с вложенными товарами
			const order = await this.prismaService.order.create({
				data: {
					email: createOrderDto.email,
					phoneNumber: createOrderDto.phoneNumber,
					userId: createOrderDto.userId,
					status: 'pending',
					totalPrice,
					delivery: createOrderDto.delivery,
					paymentMethod: createOrderDto.paymentMethod,
					comment: createOrderDto.comment,
					orderItems: {
						create: orderItems,
					},
				},
				include: {
					orderItems: true,
				},
			});

			return order as unknown as OrderResponse;
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

	// Получение всех заказов
	public async getAllOrders(): Promise<OrderResponse[]> {
		try {
			const orders = await this.prismaService.order.findMany({
				include: {
					orderItems: true,
				},
			});
			return orders as unknown as OrderResponse[];
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

	// Получение заказа по ID
	public async getOrdersByUserId(id: number): Promise<OrderResponse[]> {
		try {
			const order = await this.prismaService.order.findMany({
				where: { userId: id },
				include: {
					orderItems: true,
				},
			});

			if (!order) {
				throw new HttpException(
					'Заказ с указанным идентификатором не найден',
					HttpStatus.NOT_FOUND,
				);
			}

			return order;
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

	// Получение заказа по ID
	public async getOrderById(id: number): Promise<OrderResponse> {
		try {
			const order = await this.prismaService.order.findUnique({
				where: { id },
				include: {
					orderItems: true,
				},
			});

			if (!order) {
				throw new HttpException(
					'Заказ с указанным идентификатором не найден',
					HttpStatus.NOT_FOUND,
				);
			}

			return order;
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

	// Обновление заказа
	public async updateOrder(
		id: number,
		updateOrderDto: UpdateOrderDto,
	): Promise<OrderResponse> {
		try {
			// Проверяем существование заказа
			const existingOrder = await this.prismaService.order.findUnique({
				where: { id },
				include: { orderItems: true },
			});

			if (!existingOrder) {
				throw new HttpException(
					'Заказ с указанным идентификатором не найден',
					HttpStatus.NOT_FOUND,
				);
			}

			// Подготавливаем данные для обновления - только статус
			const updateData: any = {};

			// Обновляем только статус заказа, если он предоставлен
			if (updateOrderDto.status) {
				updateData.status = updateOrderDto.status;
			} else {
				throw new HttpException(
					'Можно обновлять только статус заказа',
					HttpStatus.BAD_REQUEST,
				);
			}

			// Обновляем заказ
			const updatedOrder = await this.prismaService.order.update({
				where: { id },
				data: updateData,
				include: {
					orderItems: true,
				},
			});

			return updatedOrder as unknown as OrderResponse;
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

	// Удаление заказа
	public async deleteOrder(id: number): Promise<boolean> {
		try {
			await this.prismaService.order.delete({
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
