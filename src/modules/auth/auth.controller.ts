import { Body, Controller, HttpCode, Post, Get } from '@nestjs/common';
import { LoginUserDto, RegisterUserDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { AuthUserResponse } from './dto/responses/auth.response';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @ApiTags('API')
  // @HttpCode(200)
  // @Get('key')
  // async getKey() {
  //   return this.authService.getPublicKey();
  // }

  @ApiTags('API')
  @ApiResponse({status: 201, type: AuthUserResponse})
  @HttpCode(201)
  @Post('register')
  async registerUser (@Body() dto: RegisterUserDto): Promise<AuthUserResponse> {
  	return this.authService.registerUser(dto);
  }

  @ApiTags('API')
  @ApiResponse({status: 200, type: AuthUserResponse})
  @HttpCode(200)
  @Post('login')
  async loginUser(@Body() dto: LoginUserDto): Promise<AuthUserResponse> {
    return this.authService.loginUser(dto);
  }


  // @HttpCode(200)
  // @Get('profile')
  // async getProfile(@Body() dto: LoginUserDto) {
  //   return this.authService.loginUser(dto);
  // }
}
