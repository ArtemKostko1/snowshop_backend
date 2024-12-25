import { ApiPropertyOptional } from '@nestjs/swagger';
import {
	IsEmail,
	IsInt,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString,
} from 'class-validator';

export class UpdateUserDto {
	@ApiPropertyOptional()
	@IsNotEmpty()
	@IsString()
	userName?: string;

	@ApiPropertyOptional()
	@IsNotEmpty()
	@IsString()
	password?: string;

	@ApiPropertyOptional()
	@IsNotEmpty()
	@IsString()
	name?: string;

	@ApiPropertyOptional()
	@IsNotEmpty()
	@IsInt()
	roleId?: number;

	@ApiPropertyOptional()
	@IsNotEmpty()
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
