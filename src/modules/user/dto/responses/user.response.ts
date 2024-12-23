import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsString, IsDate, IsEmail, IsOptional } from 'class-validator';

export class UserResponse {
  @ApiProperty()
  @IsInt()
  id: number;

  @ApiProperty()
  @IsString()
  username: string;

  @ApiPropertyOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  division_id?: number;

  @ApiProperty()
  @IsInt()
  role_id: number;

  @ApiProperty()
  @IsInt()
  status: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDate()
  inserted_at?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDate()
  updated_at?: Date;
}