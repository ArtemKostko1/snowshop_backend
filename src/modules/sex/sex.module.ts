import { Module } from '@nestjs/common';
import { SexService } from './sex.service';
import { SexController } from './sex.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
	controllers: [SexController],
	providers: [SexService, PrismaService],
	exports: [SexService],
})
export class SexModule {}
