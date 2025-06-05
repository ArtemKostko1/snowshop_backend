import { ApiProperty } from '@nestjs/swagger';
import {
	IsArray,
	IsDate,
	IsInt,
	IsNumber,
	IsOptional,
	IsString,
} from 'class-validator';

export class OrderItemResponse {
	@ApiProperty()
	@IsInt()
	id: number;

	@ApiProperty()
	@IsInt()
	orderId: number;

	@ApiProperty({ nullable: true })
	@IsOptional()
	@IsInt()
	productId?: number;

	@ApiProperty()
	@IsInt()
	quantity: number;

	@ApiProperty()
	@IsNumber()
	price: number;

	@ApiProperty()
	@IsString()
	productName: string;

	@ApiProperty()
	@IsString()
	productArticle: string;

	@ApiProperty()
	@IsString()
	productInternalCode: string;

	@ApiProperty({ nullable: true })
	@IsOptional()
	@IsString()
	productSize?: string;

	@ApiProperty()
	@IsString()
	productImage: string;
}

export class OrderResponse {
	@ApiProperty()
	@IsInt()
	id: number;

	@ApiProperty()
	@IsString()
	email: string;

	@ApiProperty()
	@IsString()
	phoneNumber: string;

	@ApiProperty({ nullable: true })
	@IsOptional()
	@IsInt()
	userId?: number;

	@ApiProperty()
	@IsString()
	status: string;

	@ApiProperty()
	@IsNumber()
	totalPrice: number;

	@ApiProperty()
	@IsString()
	delivery: string;

	@ApiProperty()
	@IsString()
	paymentMethod: string;

	@ApiProperty({ nullable: true })
	@IsOptional()
	@IsString()
	comment?: string;

	@ApiProperty()
	@IsDate()
	createdAt: Date;

	@ApiProperty()
	@IsDate()
	updatedAt: Date;

	@ApiProperty({ type: [OrderItemResponse] })
	@IsArray()
	orderItems: OrderItemResponse[];
}
