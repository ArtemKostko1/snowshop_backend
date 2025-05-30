import { Module } from '@nestjs/common';
import configuration from '../../confoguration/configuration';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '../_prisma/prisma.module';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { RoleModule } from '../role/role.module';
import { TokenModule } from '../_token/token.module';
import { SexModule } from '../sex/sex.module';
import { ProductModule } from '../product/product.module';
import { CategoryModule } from '../category/category.module';
import { BrandModule } from '../brand/brand.module';
import { CatalogModule } from '../catalog/catalog.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			load: [configuration],
		}),
		PrismaModule,
		TokenModule,
		AuthModule,
		UserModule,
		ProductModule,
		CatalogModule,
		CategoryModule,
		BrandModule,
		RoleModule,
		SexModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
