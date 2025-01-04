import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { TokenModule } from '../token/token.module';
import { RoleService } from '../role/role.service';
import { TokenService } from '../token/token.service';
import { RoleModule } from '../role/role.module';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { HashPasswordService } from 'src/common/utils/hash-password.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
	imports: [UserModule, TokenModule, RoleModule],
	controllers: [AuthController],
	providers: [
		AuthService,
		JwtService,
		TokenService,
		UserService,
		RoleService,
		HashPasswordService,
		PrismaService,
	],
})
export class AuthModule {}
