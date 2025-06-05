import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../_prisma/prisma.service';
import { HashPasswordService } from '../../common/utils/hash-password.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CLIENT_USER_FIELDS } from '../../common/constants/user-fields';
import { APP_USER_FIELDS } from '../../common/constants/user-fields';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponse } from './dto/responses/user.response';
import { UserDto } from './entities/user.entity';
import {
	PrismaClientKnownRequestError,
	PrismaClientValidationError,
} from '@prisma/client/runtime/library';
import { PrismaKnownException } from '../../common/utils/ExceptionFilter/prismaKnownException';
import { PrismaValidationException } from '../../common/utils/ExceptionFilter/prismaValidationException';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class UserService {
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
			return await this.prismaService.user.create({
				data: {
					email: createUserDto.email,
					password: hashedPassword,
					name: createUserDto.name,
					roleId: createUserDto.roleId,
					sexId: createUserDto.sexId,
					age: createUserDto.age,
					phoneNumber: createUserDto.phoneNumber,
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
			return await this.prismaService.user.findMany({
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
			const user = await this.prismaService.user.findUnique({
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

	public async getUserByEmail(email: string): Promise<UserDto> {
		try {
			return await this.prismaService.user.findUnique({
				where: { email },
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
			return await this.prismaService.user.update({
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
			await this.prismaService.user.delete({
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

	public async updateUserPassword(
		changePasswordDto: ChangePasswordDto,
	): Promise<boolean> {
		try {
			// Получаем пользователя по ID
			const user = await this.prismaService.user.findUnique({
				where: { id: changePasswordDto.userId },
				select: {
					...APP_USER_FIELDS,
				},
			});

			if (!user) {
				throw new HttpException(
					'Пользователь не найден',
					HttpStatus.NOT_FOUND,
				);
			}

			// Проверяем, совпадает ли текущий пароль
			const isPasswordValid =
				await this.hashPasswordService.comparePasswords(
					changePasswordDto.currentPassword,
					user.password,
				);

			if (!isPasswordValid) {
				throw new HttpException(
					'Текущий пароль указан неверно',
					HttpStatus.BAD_REQUEST,
				);
			}

			// Хешируем новый пароль
			const hashedPassword = await this.hashPasswordService.hashPassword(
				changePasswordDto.newPassword,
			);

			// Обновляем пароль пользователя
			await this.prismaService.user.update({
				where: { id: changePasswordDto.userId },
				data: {
					password: hashedPassword,
				},
			});

			return true;
		} catch (error) {
			// Если ошибка уже обработана (HttpException), пробрасываем её дальше
			if (error instanceof HttpException) {
				throw error;
			}

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
