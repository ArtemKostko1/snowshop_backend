import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
	IsDate,
	IsEmail,
	IsInt,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString,
} from 'class-validator';

export class RegisterUserDto {
	@ApiProperty()
	@IsNotEmpty()
	@IsEmail()
	email: string;

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
	@IsNotEmpty()
	@IsInt()
	sexId?: number;

	@ApiPropertyOptional()
	@IsOptional()
	@IsNumber()
	age?: number;

	@ApiPropertyOptional()
	@IsOptional()
	@IsDate()
	createdAt?: Date;

	@ApiPropertyOptional()
	@IsOptional()
	@IsDate()
	updatedAt?: Date;
}

export class LoginUserDto {
	@ApiProperty()
	@IsNotEmpty()
	@IsEmail()
	email: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	password: string;
}
