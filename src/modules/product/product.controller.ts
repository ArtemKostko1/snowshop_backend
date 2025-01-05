import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	HttpCode,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiResponse } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/decorators';
import { Role } from 'src/common/constants/role.enum';
import { ProductResponse } from './dto/responses/product.response';

@Controller('products')
export class ProductController {
	constructor(private readonly productService: ProductService) {}

	// Создание товара
	@Post('create')
	@HttpCode(201)
	@Roles(Role.ADMIN)
	@ApiResponse({ status: 201, type: ProductResponse })
	async createUser(
		@Body() createUserDto: CreateProductDto,
	): Promise<ProductResponse> {
		return this.productService.createProduct(createUserDto);
	}

	// Получение всех товаров
	@Get()
	@HttpCode(200)
	@Roles(Role.ADMIN, Role.USER)
	@ApiResponse({ status: 200, type: ProductResponse })
	async getAllUsers(): Promise<ProductResponse[]> {
		return this.productService.getAllProducts();
	}

	// Получение товара по ID
	@Get(':id')
	@HttpCode(200)
	@Roles(Role.ADMIN, Role.USER)
	@ApiResponse({ status: 200, type: ProductResponse })
	async getUserById(
		@Param('id') id: number,
	): Promise<ProductResponse | null> {
		return this.productService.getProductById(+id);
	}

	// Обновление товара
	@Patch(':id')
	@HttpCode(201)
	@Roles(Role.ADMIN)
	@ApiResponse({ status: 201, type: ProductResponse })
	async updateUser(
		@Param('id') id: number,
		@Body() updateDto: UpdateProductDto,
	): Promise<ProductResponse> {
		return this.productService.updateProduct(+id, updateDto);
	}

	// Удаление товара
	@Delete(':id')
	@HttpCode(200)
	@Roles(Role.ADMIN)
	@ApiResponse({ status: 200, type: ProductResponse })
	async deleteUser(@Param('id') id: number): Promise<boolean> {
		return this.productService.deleteProduct(+id);
	}
}
