import { Module } from '@nestjs/common';
import configuration from '../../confoguration/configuration';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '../prisma/prisma.module';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { HashPasswordService } from 'src/common/utils/hash-password.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			load: [configuration],
		}),
		PrismaModule,
		UserModule,
	],
	controllers: [],
	providers: [UserService, HashPasswordService, PrismaService],
})
export class AppModule {}
