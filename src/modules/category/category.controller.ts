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
import { CategoryService } from './category.service';
import { Roles } from 'src/common/decorators/decorators';
import { Role } from 'src/common/constants/role.enum';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CategoryResponse } from './dto/responses/category.response';
import { CreateCategoryDto } from './dto/create-category.dto';
import { RolesGuard } from 'src/guards/roles.guard';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('categories')
@ApiTags('CATEGORIES')
@UsePipes(ValidationPipe)
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) {}

	// Получение всех категорий
	@Get()
	@HttpCode(200)
	@ApiResponse({ status: 200, type: CategoryResponse })
	async getAllCategories(): Promise<CategoryResponse[]> {
		return this.categoryService.getAllCategories();
	}

	// Получение категории по ID
	@Get(':id')
	@HttpCode(200)
	@ApiResponse({ status: 200, type: CategoryResponse })
	async getCategoryById(
		@Param('id') id: number,
	): Promise<CategoryResponse | null> {
		return this.categoryService.getCategoryById(+id);
	}

	// Создание категории
	@Post('create')
	@HttpCode(201)
	@Roles(Role.ADMIN)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@ApiResponse({ status: 201, type: CategoryResponse })
	async createCategory(
		@Body() createCategoryDto: CreateCategoryDto,
	): Promise<CategoryResponse> {
		return this.categoryService.createCategory(createCategoryDto);
	}

	// Обновление категории
	@Patch(':id')
	@HttpCode(201)
	@Roles(Role.ADMIN)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@ApiResponse({ status: 201, type: CategoryResponse })
	async updateCategory(
		@Param('id') id: number,
		@Body() updateCategoryDto: UpdateCategoryDto,
	): Promise<CategoryResponse> {
		return this.categoryService.updateCategory(+id, updateCategoryDto);
	}

	// Удаление категории
	@Delete(':id')
	@HttpCode(200)
	@Roles(Role.ADMIN)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@ApiResponse({ status: 200, type: Boolean })
	async deleteCategory(@Param('id') id: number): Promise<boolean> {
		return this.categoryService.deleteCategory(+id);
	}
}
