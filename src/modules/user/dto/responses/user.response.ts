import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
	IsInt,
	IsString,
	IsDate,
	IsEmail,
	IsOptional,
	IsNumber,
} from 'class-validator';

export class UserResponse {
	@ApiProperty()
	@IsInt()
	id: number;

	@ApiProperty()
	@IsString()
	userName: string;

	@ApiProperty()
	@IsString()
	password: string;

	@ApiProperty()
	@IsString()
	name: string;

	@ApiProperty()
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

	@ApiPropertyOptional()
	@IsOptional()
	@IsDate()
	createdAt?: Date;

	@ApiPropertyOptional()
	@IsOptional()
	@IsDate()
	updatedAt?: Date;
}
