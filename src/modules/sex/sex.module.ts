import { Module } from '@nestjs/common';
import { SexService } from './sex.service';
import { SexController } from './sex.controller';
import { PrismaService } from '../_prisma/prisma.service';
import { JwtStrategy } from 'src/jwt-strategy/jwt-strategy';

@Module({
	controllers: [SexController],
	providers: [SexService, JwtStrategy, PrismaService],
	exports: [SexService],
})
export class SexModule {}
