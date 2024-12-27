import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class RoleResponse {
	@ApiProperty()
	@IsInt()
	id: number;

	@ApiProperty()
	@IsString()
	name: string;

	@ApiProperty()
	@IsString()
	value: string;
}
