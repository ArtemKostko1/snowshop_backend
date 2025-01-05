import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
	IsEmail,
	IsInt,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString,
} from 'class-validator';

export class CreateUserDto {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	userName: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	password: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	name: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsInt()
	roleId: number;

	@ApiPropertyOptional()
	@IsOptional()
	@IsInt()
	sexId?: number;

	@ApiPropertyOptional()
	@IsOptional()
	@IsNumber()
	age?: number;

	@ApiPropertyOptional()
	@IsOptional()
	@IsEmail()
	email?: string;
}
