import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RoleResponse } from './dto/response/role.response';
import {
	PrismaClientKnownRequestError,
	PrismaClientValidationError,
} from '@prisma/client/runtime/library';
import { PrismaKnownException } from '../../common/utils/ExceptionFilter/prismaKnownException';
import { PrismaValidationException } from '../../common/utils/ExceptionFilter/prismaValidationException';

@Injectable()
export class RoleService {
	constructor(private readonly prismaService: PrismaService) {}

	public async getAllRoles(): Promise<RoleResponse[]> {
		try {
			// Выборка всех адресов и возврат их клиенту
			return await this.prismaService.role.findMany();
		} catch (error) {
			// Обработка специфических ошибок Prisma
			if (error instanceof PrismaClientKnownRequestError) {
				throw new PrismaKnownException(error);
			} else if (error instanceof PrismaClientValidationError) {
				throw new PrismaValidationException(error);
			}
			// Обработка иных ошибок
			throw error;
		}
	}

	public async getRoleById(id: number): Promise<RoleResponse> {
		try {
			// Выборка адреса по Id и возврат его клиенту
			const role = await this.prismaService.role.findUnique({
				where: { id },
			});

			if (!role) {
				throw new HttpException(
					'Запись с указанным идинетификатором не найдена',
					HttpStatus.NOT_FOUND,
				);
			}

			return role;
		} catch (error) {
			// Обработка специфических ошибок Prisma
			if (error instanceof PrismaClientKnownRequestError) {
				throw new PrismaKnownException(error);
			} else if (error instanceof PrismaClientValidationError) {
				throw new PrismaValidationException(error);
			}
			// Обработка иных ошибок
			throw error;
		}
	}
}
