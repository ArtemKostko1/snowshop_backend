import {
	BadRequestException,
	HttpException,
	HttpStatus,
	Injectable,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { HashPasswordService } from '../../common/utils/hash-password.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CLIENT_USER_FIELDS } from '../../common/constants/user-fields';
import { APP_USER_FIELDS } from '../../common/constants/user-fields';
import { v4 as uuidv4 } from 'uuid';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponse } from './dto/responses/user.response';
import { UserDto } from './entities/user.entity';
import {
	PrismaClientKnownRequestError,
	PrismaClientValidationError,
} from '@prisma/client/runtime/library';
import { PrismaKnownException } from '../../common/utils/ExceptionFilter/prismaKnownException';
import { PrismaValidationException } from '../../common/utils/ExceptionFilter/prismaValidationException';

@Injectable()
export class UsersService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly hashPasswordService: HashPasswordService,
	) {}

	public async createUser(
		createUserDto: CreateUserDto,
	): Promise<UserResponse> {
		try {
			// Вызов метода зашифровки пароля в хэш
			const hashedPassword = await this.hashPasswordService.hashPassword(
				createUserDto.password,
			);
			// Создание пользователя и возврат его клиенту
			return await this.prismaService.users.create({
				data: {
					username: createUserDto.username,
					email: createUserDto.email,
					division_id: createUserDto.division_id,
					role_id: createUserDto.role_id,
					status: createUserDto.status,
					uuid: uuidv4(),
					password: hashedPassword,
				},
				// Выборка тех полей, которые нужно вернуть (исключены password и uuid)
				select: {
					...CLIENT_USER_FIELDS,
				},
			});
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

	public async getAllUsers(): Promise<UserResponse[]> {
		try {
			return await this.prismaService.users.findMany({
				select: {
					...CLIENT_USER_FIELDS,
				},
			});
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

	public async getUserById(id: number): Promise<UserResponse> {
		try {
			const user = await this.prismaService.users.findUnique({
				where: { id },
				select: {
					...CLIENT_USER_FIELDS,
				},
			});

			if (!user) {
				throw new HttpException(
					'Запись с указанным идинетификатором не найдена',
					HttpStatus.NOT_FOUND,
				);
			}

			return user;
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

	public async getUserByUsername(username: string): Promise<UserDto> {
		try {
			return await this.prismaService.users.findUnique({
				where: { username },
				select: {
					...APP_USER_FIELDS,
				},
			});
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

	public async updateUser(
		id: number,
		updateUserDto: UpdateUserDto,
	): Promise<UserResponse> {
		try {
			if (updateUserDto.password) {
				// Вызов метода зашифровки пароля в хэш
				const hashedPassword =
					await this.hashPasswordService.hashPassword(
						updateUserDto.password,
					);

				updateUserDto.password = hashedPassword;
			}

			// Обновление пользователя по Id и возврат его клиенту
			return await this.prismaService.users.update({
				where: { id },
				data: updateUserDto,
				// Выборка полей, которые необходимо вернуть клиенту
				select: {
					...CLIENT_USER_FIELDS,
				},
			});
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

	public async deleteUser(id: number): Promise<boolean> {
		try {
			await this.prismaService.users.delete({
				where: { id },
			});
			return true;
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
