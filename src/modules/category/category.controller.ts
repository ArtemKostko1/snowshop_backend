import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Patch,
	Post,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { Roles } from 'src/common/decorators/decorators';
import { Role } from 'src/common/constants/role.enum';
import { ApiResponse } from '@nestjs/swagger';
import { CategoryResponse } from './dto/responses/category.response';
import { BrandResponse } from '../brand/dto/responses/brand.response';
import { CreateBrandDto } from '../brand/dto/create-brand.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateBrandDto } from '../brand/dto/update-brand.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) {}

	// Получение всех категорий
	@Get()
	@HttpCode(200)
	@Roles(Role.ADMIN, Role.USER)
	@ApiResponse({ status: 200, type: CategoryResponse })
	async getAllCategories(): Promise<CategoryResponse[]> {
		return this.categoryService.getAllCategories();
	}

	// Получение бренда по ID
	@Get(':id')
	@HttpCode(200)
	@Roles(Role.ADMIN, Role.USER)
	@ApiResponse({ status: 200, type: CategoryResponse })
	async getCategoryById(
		@Param('id') id: number,
	): Promise<CategoryResponse | null> {
		return this.categoryService.getCategoryById(+id);
	}

	// Создание бренда
	@Post('create')
	@HttpCode(201)
	@Roles(Role.ADMIN)
	@ApiResponse({ status: 201, type: CategoryResponse })
	async createCategory(
		@Body() createCategoryDto: CreateCategoryDto,
	): Promise<CategoryResponse> {
		return this.categoryService.createCategory(createCategoryDto);
	}

	// Обновление бренда
	@Patch(':id')
	@HttpCode(201)
	@Roles(Role.ADMIN)
	@ApiResponse({ status: 201, type: CategoryResponse })
	async updateCategory(
		@Param('id') id: number,
		@Body() updateCategoryDto: UpdateCategoryDto,
	): Promise<CategoryResponse> {
		return this.categoryService.updateCategory(+id, updateCategoryDto);
	}

	// Удаление бренда
	@Delete(':id')
	@HttpCode(200)
	@Roles(Role.ADMIN)
	@ApiResponse({ status: 200, type: BrandResponse })
	async deleteCategory(@Param('id') id: number): Promise<boolean> {
		return this.categoryService.deleteCategory(+id);
	}
}
