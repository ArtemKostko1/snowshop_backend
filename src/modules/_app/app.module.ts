import { Module } from '@nestjs/common';
import configuration from '../../confoguration/configuration';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '../prisma/prisma.module';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { HashPasswordService } from 'src/common/utils/hash-password.service';
import { PrismaService } from '../prisma/prisma.service';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/auth.service';
import { RoleModule } from '../role/role.module';
import { RoleService } from '../role/role.service';
import { TokenModule } from '../token/token.module';
import { TokenService } from '../token/token.service';
import { JwtService } from '@nestjs/jwt';
import { SexModule } from '../sex/sex.module';
import { SexService } from '../sex/sex.service';

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
	providers: [
		JwtService,
		TokenService,
		AuthService,
		UserService,
		RoleService,
		SexService,
		HashPasswordService,
		PrismaService,
	],
})
export class AppModule {}
