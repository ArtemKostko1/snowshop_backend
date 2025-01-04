import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { PrismaService } from '../prisma/prisma.service';
import { JwtStrategy } from 'src/jwt-strategy/jwt-strategy';

@Module({
	controllers: [RoleController],
	providers: [RoleService, JwtStrategy, PrismaService],
	exports: [RoleService],
})
export class RoleModule {}
