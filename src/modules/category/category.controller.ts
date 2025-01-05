import { Controller, Get, HttpCode } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Roles } from 'src/common/decorators/decorators';
import { Role } from 'src/common/constants/role.enum';
import { ApiResponse } from '@nestjs/swagger';
import { CategoryResponse } from './dto/responses/category.response';

@Controller('categories')
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) {}

	// Получение всех категорий
	@Get()
	@HttpCode(200)
	@Roles(Role.ADMIN, Role.USER)
	@ApiResponse({ status: 200, type: CategoryResponse })
	async getAllRoles(): Promise<CategoryResponse[]> {
		return this.categoryService.getAllCategories();
	}
}
