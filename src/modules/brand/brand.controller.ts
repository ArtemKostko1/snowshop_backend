import { Controller, Get, HttpCode } from '@nestjs/common';
import { BrandService } from './brand.service';
import { Roles } from 'src/common/decorators/decorators';
import { Role } from 'src/common/constants/role.enum';
import { ApiResponse } from '@nestjs/swagger';
import { BrandResponse } from './dto/responses/brand.response';

@Controller('brands')
export class BrandController {
	constructor(private readonly brandService: BrandService) {}

	// Получение всех брендов
	@Get()
	@HttpCode(200)
	@Roles(Role.ADMIN, Role.USER)
	@ApiResponse({ status: 200, type: BrandResponse })
	async getAllRoles(): Promise<BrandResponse[]> {
		return this.brandService.getAllCategories();
	}
}
