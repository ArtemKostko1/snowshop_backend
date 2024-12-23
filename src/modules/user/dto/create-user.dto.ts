import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  division_id?: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  role_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  status: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;
}
