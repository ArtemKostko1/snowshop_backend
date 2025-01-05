import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
	IsInt,
	IsString,
	IsDate,
	IsOptional,
	IsBoolean,
} from 'class-validator';

export class ProductResponse {
	@ApiProperty()
	@IsInt()
	id: number;

	@ApiProperty()
	@IsString()
	name: string;

	@ApiProperty()
	@IsInt()
	price: number;

	@ApiProperty()
	@IsInt()
	categoryId: number;

	@ApiProperty()
	@IsInt()
	brandId: number;

	@ApiPropertyOptional()
	@IsOptional()
	@IsString()
	size?: string;

	@ApiProperty()
	@IsString()
	article: string;

	@ApiProperty()
	@IsBoolean()
	inStock: boolean;

	@ApiProperty()
	@IsString()
	description: string;

	@ApiProperty()
	@IsString()
	internalCode: string;

	@ApiProperty()
	@IsDate()
	createdAt: Date;

	@ApiProperty()
	@IsDate()
	updatedAt: Date;
}
