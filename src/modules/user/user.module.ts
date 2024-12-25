import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from '../prisma/prisma.service';
import { HashPasswordService } from 'src/common/utils/hash-password.service';

@Module({
	controllers: [UserController],
	providers: [UserService, PrismaService, HashPasswordService],
})
export class UserModule {}
