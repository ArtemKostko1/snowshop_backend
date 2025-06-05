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
import { BrandService } from './brand.service';
import { Roles } from 'src/common/decorators/decorators';
import { Role } from 'src/common/constants/role.enum';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { BrandResponse } from './dto/responses/brand.response';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';

@Controller('brands')
@ApiTags('BRANDS')
@UsePipes(ValidationPipe)
export class BrandController {
	constructor(private readonly brandService: BrandService) {}

	// Получение всех брендов
	@Get()
	@HttpCode(200)
	@ApiResponse({ status: 200, type: BrandResponse })
	async getAllBrands(): Promise<BrandResponse[]> {
		return this.brandService.getAllBrands();
	}

	// Получение бренда по ID
	@Get(':id')
	@HttpCode(200)
	@ApiResponse({ status: 200, type: BrandResponse })
	async getBrandById(@Param('id') id: number): Promise<BrandResponse | null> {
		return this.brandService.getBrandById(+id);
	}

	// Создание бренда
	@Post('create')
	@HttpCode(201)
	@Roles(Role.ADMIN)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@ApiResponse({ status: 201, type: BrandResponse })
	async createBrand(
		@Body() createBrandDto: CreateBrandDto,
	): Promise<BrandResponse> {
		return this.brandService.createBrand(createBrandDto);
	}

	// Обновление бренда
	@Patch(':id')
	@HttpCode(201)
	@Roles(Role.ADMIN)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@ApiResponse({ status: 201, type: BrandResponse })
	async updateBrand(
		@Param('id') id: number,
		@Body() updateBrandDto: UpdateBrandDto,
	): Promise<BrandResponse> {
		return this.brandService.updateBrand(+id, updateBrandDto);
	}

	// Удаление бренда
	@Delete(':id')
	@HttpCode(200)
	@Roles(Role.ADMIN)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@ApiResponse({ status: 200, type: BrandResponse })
	async deleteBrand(@Param('id') id: number): Promise<boolean> {
		return this.brandService.deleteBrand(+id);
	}
}
