import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { TokenModule } from '../token/token.module';
import { JwtStrategy } from '../../jwt-strategy/jwt-strategy';
import { RoleService } from '../role/role.service';

@Module({
	imports: [UserModule, TokenModule],
	controllers: [AuthController],
	providers: [AuthService, RoleService, JwtStrategy],
})
export class AuthModule {}
