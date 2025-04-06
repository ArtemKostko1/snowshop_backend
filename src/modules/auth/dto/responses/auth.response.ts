import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
	IsEmail,
	IsInt,
	IsNumber,
	IsOptional,
	IsString,
} from 'class-validator';

export class UserResponse {
	@ApiProperty()
	@IsInt()
	id: number;

	@ApiProperty()
	@IsEmail()
	email: string;

	@ApiProperty()
	@IsString()
	name: string;

	@ApiProperty()
	@IsString()
	role: string;

	@ApiPropertyOptional()
	@IsOptional()
	@IsString()
	sex?: string;

	@ApiPropertyOptional()
	@IsOptional()
	@IsNumber()
	age?: number;
}

export class AuthUserResponse {
	@ApiProperty()
	user: UserResponse;

	@ApiProperty()
	@IsString()
	token: string;
}
