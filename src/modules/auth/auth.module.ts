import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { UsersModule } from '../users/users.module';
import { TokenModule } from '../token/token.module';
import { HashPasswordService } from '../../common/utils/hash-password.service';
import { JwtStrategy } from '../../jwt-strategy/jwt-strategy';
import { RolesService } from '../roles/roles.service';

@Module({
	imports: [UsersModule, TokenModule],
	controllers: [AuthController],
	providers: [AuthService, PrismaService, RolesService, HashPasswordService, JwtStrategy],
})
export class AuthModule {}
