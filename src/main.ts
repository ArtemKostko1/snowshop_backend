import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/_app/app.module';
import { ConfigService } from '@nestjs/config';
import * as cors from 'cors';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const configService = app.get(ConfigService);

	// Установка глобального префикса в url сервера
	const global_prefix = configService.get('global_prefix');
	app.setGlobalPrefix(global_prefix);

	// Опции cors
	const cors_origins = configService.get<string>('cors_origins')?.split(',');
	const corsOptions: cors.CorsOptions = {
		origin: cors_origins, // Разрешить запросы от этого источника
		methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], // Разрешить указанные HTTP-методы
		//allowedHeaders: ['Content-Type', 'Authorization'], // Разрешить указанные заголовки
	};
	app.use(cors(corsOptions));

	// Настройка Swagger
	const config = new DocumentBuilder()
		.setTitle('SnowShop API')
		.setDescription('This api for snowShop-backend')
		.setVersion('0.0.1')
		.addTag('API')
		.addBearerAuth()
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api/swagger', app, document);

	// Запуск сервера
	const port = configService.get('port');
	await app.listen(port, '0.0.0.0');
}
bootstrap();
