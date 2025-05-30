import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsDate, IsBoolean, IsArray } from 'class-validator';

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

	@ApiProperty()
	@IsString()
	size: string;

	@ApiProperty()
	@IsString()
	article: string;

	@ApiProperty()
	@IsString()
	articleRoute: string;

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
	@IsArray()
	images: string[];

	@ApiProperty()
	@IsDate()
	createdAt: Date;

	@ApiProperty()
	@IsDate()
	updatedAt: Date;
}
