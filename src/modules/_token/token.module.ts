import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RoleService } from '../role/role.service';
import { PrismaService } from '../_prisma/prisma.service';

@Module({
	imports: [
		PassportModule.register({
			defaultStrategy: 'jwt',
			property: 'user',
			session: false,
		}),
		JwtModule.registerAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => ({
				secret: configService.get<string>('jwtSecret'),
				signOptions: {
					expiresIn: configService.get<string>('jwtExpire'),
				},
			}),
			inject: [ConfigService],
		}),
	],
	providers: [TokenService, JwtService, RoleService, PrismaService],
	exports: [TokenService],
})
export class TokenModule {}
