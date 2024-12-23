import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  username?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  division_id?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNotEmpty()
  @IsInt()
  role_id?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNotEmpty()
  @IsInt()
  status?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  password?: string;
}
