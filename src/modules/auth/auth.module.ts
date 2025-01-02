import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { TokenModule } from '../token/token.module';
import { RoleService } from '../role/role.service';
import { TokenService } from '../token/token.service';
import { RoleModule } from '../role/role.module';
import { UserService } from '../user/user.service';
import { PrismaService } from '../prisma/prisma.service';
import { HashPasswordService } from 'src/common/utils/hash-password.service';
import { JwtService } from '@nestjs/jwt';
import { SexService } from '../sex/sex.service';
import { SexModule } from '../sex/sex.module';

@Module({
	imports: [UserModule, TokenModule, RoleModule, SexModule],
	controllers: [AuthController],
	providers: [
		TokenService,
		JwtService,
		AuthService,
		UserService,
		RoleService,
		SexService,
		PrismaService,
		HashPasswordService,
	],
})
export class AuthModule {}
