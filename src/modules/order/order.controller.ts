import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	HttpCode,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiResponse } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/decorators';
import { Role } from 'src/common/constants/role.enum';
import { OrderResponse } from './dto/responses/order.response';

@Controller('orders')
export class OrderController {
	constructor(private readonly orderService: OrderService) {}

	// Создание заказа
	@Post('create')
	@HttpCode(201)
	@ApiResponse({ status: 201, type: OrderResponse })
	async createOrder(
		@Body() createOrderDto: CreateOrderDto,
	): Promise<OrderResponse> {
		return this.orderService.createOrder(createOrderDto);
	}

	// Получение всех заказов
	@Get()
	@HttpCode(200)
	@Roles(Role.ADMIN)
	@ApiResponse({ status: 200, type: [OrderResponse] })
	async getAllOrders(): Promise<OrderResponse[]> {
		return this.orderService.getAllOrders();
	}

	// Получение заказа по ID
	@Get(':id')
	@HttpCode(200)
	@ApiResponse({ status: 200, type: OrderResponse })
	async getOrderById(@Param('id') id: number): Promise<OrderResponse | null> {
		return this.orderService.getOrderById(+id);
	}

	// Обновление заказа
	@Patch(':id')
	@HttpCode(201)
	@Roles(Role.ADMIN)
	@ApiResponse({ status: 201, type: OrderResponse })
	async updateOrder(
		@Param('id') id: number,
		@Body() updateOrderDto: UpdateOrderDto,
	): Promise<OrderResponse> {
		return this.orderService.updateOrder(+id, updateOrderDto);
	}

	// Удаление заказа
	@Delete(':id')
	@HttpCode(200)
	@Roles(Role.ADMIN)
	@ApiResponse({ status: 200, type: Boolean })
	async deleteOrder(@Param('id') id: number): Promise<boolean> {
		return this.orderService.deleteOrder(+id);
	}
}
