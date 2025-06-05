import { IsDate, IsEmail, IsInt, IsNumber, IsString } from 'class-validator';

export class UserDto {
	@IsInt()
	id: number;

	@IsEmail()
	email: string;

	@IsString()
	password: string;

	@IsString()
	name: string;

	@IsInt()
	roleId: number;

	@IsInt()
	sexId?: number;

	@IsNumber()
	age?: number;

	@IsString()
	phoneNumber?: string;

	@IsDate()
	createdAt?: Date;

	@IsDate()
	updatedAt?: Date;
}
