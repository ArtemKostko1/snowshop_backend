import {
	Controller,
	Get,
	Param,
	HttpCode,
	ValidationPipe,
	UsePipes,
} from '@nestjs/common';
import { CatalogService } from './catalog.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CatalogProductResponse } from './dto/responses/catalog.response';

@Controller('catalog')
@ApiTags('CATALOG')
@UsePipes(ValidationPipe)
export class CatalogController {
	constructor(private readonly catalogService: CatalogService) {}

	// Получение всех товаров каталога
	@Get()
	@HttpCode(200)
	@ApiResponse({ status: 200, type: CatalogProductResponse })
	async getAllCatalogProducts(): Promise<CatalogProductResponse[]> {
		return this.catalogService.getAllCatalogProducts();
	}

	// Получение товаров по категории
	@Get('/category/:categoryName')
	@HttpCode(200)
	@ApiResponse({ status: 200, type: CatalogProductResponse })
	async getProductByCategory(
		@Param('categoryName') categoryName: string,
	): Promise<CatalogProductResponse[]> {
		return this.catalogService.getProductsByCategory(categoryName);
	}

	// Получение товара по артиклу запроса
	@Get(':articleRoute')
	@HttpCode(200)
	@ApiResponse({ status: 200, type: CatalogProductResponse })
	async getProductByArticleRoute(
		@Param('articleRoute') articleRoute: string,
	): Promise<CatalogProductResponse | null> {
		return this.catalogService.getProductByArticleRoute(articleRoute);
	}
}
