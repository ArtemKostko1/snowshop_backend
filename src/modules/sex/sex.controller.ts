import {
	Controller,
	Get,
	Param,
	HttpCode,
	UseGuards,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { SexService } from './sex.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { SexResponse } from './dto/response/sex.response';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/common/decorators/decorators';
import { Role } from 'src/common/constants/role.enum';

@Controller('sex')
@ApiTags('SEX')
@UsePipes(ValidationPipe)
@UseGuards(JwtAuthGuard, RolesGuard)
export class SexController {
	constructor(private readonly sexService: SexService) {}

	// Получение всех ролей
	@Get()
	@HttpCode(200)
	@Roles(Role.ADMIN)
	@ApiResponse({ status: 200, type: SexResponse })
	async getAllRoles(): Promise<SexResponse[]> {
		return this.sexService.getAllSex();
	}

	// Получение роли по ID
	@Get(':id')
	@HttpCode(200)
	@Roles(Role.ADMIN)
	@ApiResponse({ status: 200, type: SexResponse })
	async getRoleById(@Param('id') id: number): Promise<SexResponse> {
		return this.sexService.getSexById(+id);
	}
}
