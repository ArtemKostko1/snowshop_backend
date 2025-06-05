import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';

export class ChangePasswordDto {
	@ApiProperty({
		description: 'ID пользователя',
		example: 1,
	})
	@IsNumber()
	@IsNotEmpty()
	userId: number;

	@ApiProperty({
		description: 'Текущий пароль пользователя',
		example: 'currentPassword123',
	})
	@IsString()
	@IsNotEmpty()
	currentPassword: string;

	@ApiProperty({
		description: 'Новый пароль пользователя',
		example: 'newPassword123',
	})
	@IsString()
	@IsNotEmpty()
	@MinLength(8)
	newPassword: string;
}
