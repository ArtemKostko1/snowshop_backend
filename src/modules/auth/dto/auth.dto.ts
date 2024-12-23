import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class RegisterUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  email?: string;

  @ApiProperty()
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

  @ApiProperty()
  @IsDate()
  inserted_at: Date;

  @ApiProperty()
  @IsDate()
  updated_at: Date;
}

export class LoginUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;
}
