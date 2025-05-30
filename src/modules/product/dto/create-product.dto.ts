import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
	IsArray,
	IsBoolean,
	IsInt,
	IsNotEmpty,
	IsNumber,
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
	@IsNumber()
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
	@IsString()
	articleRoute: string;

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

	@ApiProperty()
	@IsNotEmpty()
	@IsArray()
	@IsString({ each: true })
	images: string[];
}
