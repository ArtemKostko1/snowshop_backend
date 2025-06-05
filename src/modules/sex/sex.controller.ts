import {
	Controller,
	Get,
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

	// Получение всех полов
	@Get()
	@HttpCode(200)
	@Roles(Role.ADMIN)
	@ApiResponse({ status: 200, type: SexResponse })
	async getAllSex(): Promise<SexResponse[]> {
		return this.sexService.getAllSex();
	}
}
