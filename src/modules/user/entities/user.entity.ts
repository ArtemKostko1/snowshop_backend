import { IsDate, IsEmail, IsInt, IsString } from 'class-validator';

export class UserDto {
  @IsInt()
  id: number;

  @IsString()
  username: string;

  @IsEmail()
  email?: string;

  @IsInt()
  division_id?: number;

  @IsInt()
  role_id: number;

  @IsInt()
  status: number;

  @IsString()
  uuid: string;

  @IsString()
  password: string;

  @IsDate()
  inserted_at?: Date;

  @IsDate()
  updated_at?: Date;
}
