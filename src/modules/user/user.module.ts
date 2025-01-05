import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from '../_prisma/prisma.service';
import { HashPasswordService } from 'src/common/utils/hash-password.service';
import { TokenModule } from '../_token/token.module';

@Module({
	imports: [TokenModule],
	controllers: [UserController],
	providers: [UserService, PrismaService, HashPasswordService],
	exports: [UserService],
})
export class UserModule {}
