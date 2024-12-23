import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsInt, IsOptional, IsString } from 'class-validator';

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
  @IsString()
  role: string;

  @ApiProperty()
  @IsInt()
  status: number;
}

export class AuthUserResponse {
  @ApiProperty()
  user: UserResponse

  @ApiProperty()
  @IsString()
  token: string;
}
