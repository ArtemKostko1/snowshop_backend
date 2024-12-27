import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Patch,
	Post,
	UseGuards,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponse } from './dto/responses/user.response';
import { UserService } from './user.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/common/decorators/decorators';
import { Role } from 'src/common/constants/role.enum';

@Controller('users')
@ApiTags('USERS')
@UsePipes(ValidationPipe)
@UseGuards(JwtAuthGuard, RolesGuard)
@UseGuards(JwtAuthGuard)
export class UserController {
	constructor(private readonly userService: UserService) {}

	// Создание пользователя
	@Post('create')
	@HttpCode(201)
	@Roles(Role.ADMIN)
	@ApiResponse({ status: 201, type: UserResponse })
	async createUser(
		@Body() createUserDto: CreateUserDto,
	): Promise<UserResponse> {
		return this.userService.createUser(createUserDto);
	}

	// Получение всех пользователей
	@Get()
	@HttpCode(200)
	@Roles(Role.ADMIN)
	@ApiResponse({ status: 200, type: UserResponse })
	async getAllUsers(): Promise<UserResponse[]> {
		return this.userService.getAllUsers();
	}

	// Получение пользователя по ID
	@Get(':id')
	@HttpCode(200)
	@Roles(Role.ADMIN, Role.USER)
	@ApiResponse({ status: 200, type: UserResponse })
	async getUserById(@Param('id') id: number): Promise<UserResponse | null> {
		return this.userService.getUserById(+id);
	}

	// Обновление пользователя
	@Patch(':id')
	@HttpCode(201)
	@Roles(Role.ADMIN)
	@ApiResponse({ status: 201, type: UserResponse })
	async updateUser(
		@Param('id') id: number,
		@Body() updateDto: UpdateUserDto,
	): Promise<UserResponse> {
		return this.userService.updateUser(+id, updateDto);
	}

	// Удаление пользователя
	@Delete(':id')
	@HttpCode(200)
	@Roles(Role.ADMIN)
	@ApiResponse({ status: 200, type: UserResponse })
	async deleteUser(@Param('id') id: number): Promise<boolean> {
		return this.userService.deleteUser(+id);
	}
}
