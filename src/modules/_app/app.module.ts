import { Module } from '@nestjs/common';
import configuration from '../../confoguration/configuration';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '../prisma/prisma.module';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { RoleModule } from '../role/role.module';
import { TokenModule } from '../token/token.module';
import { SexModule } from '../sex/sex.module';

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
		RoleModule,
		SexModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
