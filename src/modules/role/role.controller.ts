import {
	Controller,
	Get,
	Param,
	HttpCode,
	UseGuards,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { RoleResponse } from './dto/response/role.response';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/common/decorators/decorators';
import { Role } from 'src/common/constants/role.enum';

@Controller('roles')
@ApiTags('ROLES')
@UsePipes(ValidationPipe)
@UseGuards(JwtAuthGuard, RolesGuard)
export class RoleController {
	constructor(private readonly roleService: RoleService) {}

	// Получение всех ролей
	@Get()
	@HttpCode(200)
	@Roles(Role.ADMIN)
	@ApiResponse({ status: 200, type: RoleResponse })
	async getAllRoles(): Promise<RoleResponse[]> {
		return this.roleService.getAllRoles();
	}

	// Получение роли по ID
	@Get(':id')
	@HttpCode(200)
	@Roles(Role.ADMIN)
	@ApiResponse({ status: 200, type: RoleResponse })
	async getRoleById(@Param('id') id: number): Promise<RoleResponse> {
		return this.roleService.getRoleById(+id);
	}
}
