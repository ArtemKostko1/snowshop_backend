import { Controller, Get, Param, HttpCode } from '@nestjs/common';
import { CatalogService } from './catalog.service';
import { ApiResponse } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/decorators';
import { Role } from 'src/common/constants/role.enum';
import { CatalogProductResponse } from './dto/responses/catalog.response';

@Controller('catalog')
export class CatalogController {
	constructor(private readonly catalogService: CatalogService) {}

	// Получение всех товаров каталога
	@Get()
	@HttpCode(200)
	@Roles(Role.USER)
	@ApiResponse({ status: 200, type: CatalogProductResponse })
	async getAllCatalogProducts(): Promise<CatalogProductResponse[]> {
		return this.catalogService.getAllCatalogProducts();
	}

	// Получение товара по артиклу запроса
	@Get(':articleRoute')
	@HttpCode(200)
	@Roles(Role.ADMIN, Role.USER)
	@ApiResponse({ status: 200, type: CatalogProductResponse })
	async getProductByArticleRoute(
		@Param('articleRoute') articleRoute: string,
	): Promise<CatalogProductResponse | null> {
		return this.catalogService.getProductByArticleRoute(articleRoute);
	}
}
