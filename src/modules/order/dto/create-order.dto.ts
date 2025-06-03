import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
	IsArray,
	IsEmail,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString,
	ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class OrderItemDto {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	productInternalCode: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	productSize: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsNumber()
	quantity: number;
}

export class CreateOrderDto {
	@ApiProperty()
	@IsNotEmpty()
	@IsEmail()
	email: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	phoneNumber: string;

	@ApiPropertyOptional()
	@IsOptional()
	@IsNumber()
	userId?: number;

	@ApiPropertyOptional()
	@IsOptional()
	@IsString()
	status?: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	delivery: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	paymentMethod: string;

	@ApiPropertyOptional()
	@IsOptional()
	@IsString()
	comment?: string;

	@ApiProperty({ type: [OrderItemDto] })
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => OrderItemDto)
	orderItems: OrderItemDto[];
}
