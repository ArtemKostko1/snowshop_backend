import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
	IsBoolean,
	IsInt,
	IsNotEmpty,
	IsOptional,
	IsString,
} from 'class-validator';

export class CreateProductDto {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	name: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsInt()
	price: number;

	@ApiProperty()
	@IsNotEmpty()
	@IsInt()
	categoryId: number;

	@ApiProperty()
	@IsNotEmpty()
	@IsInt()
	brandId: number;

	@ApiPropertyOptional()
	@IsOptional()
	@IsString()
	size?: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	article: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsBoolean()
	inStock: boolean;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	description: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	internalCode: string;
}
