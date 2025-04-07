import {
	BadRequestException,
	HttpException,
	HttpStatus,
	Injectable,
} from '@nestjs/common';
import { TokenService } from '../_token/token.service';
import { UserService } from '../user/user.service';
import { LoginUserDto, RegisterUserDto } from './dto/auth.dto';
import { AppErrors } from '../../common/errors/errors';
import * as bcrypt from 'bcrypt';
import { AuthUserResponse } from './dto/responses/auth.response';
import { RoleService } from '../role/role.service';

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UserService,
		private readonly tokenService: TokenService,
		private readonly roleService: RoleService,
	) {}

	// Метод регистрации пользователя
	public async registerUser(dto: RegisterUserDto): Promise<AuthUserResponse> {
		try {
			// Получение обьъекта user из базы данных по полю username
			const existUser = await this.userService.getUserByEmail(dto.email);

			// Проверка пользователя на его наличие в базе
			if (!existUser) {
				const newUser = {
					...dto,
					roleId: 2,
				};

				// Создание пользователя в базе данных и получение его объекта
				const createdUser = await this.userService.createUser(newUser);

				// Диструкторизация полей объекта existUser без поля password, createdAt и updatedAt
				const {
					roleId,
					sexId,
					password,
					createdAt,
					updatedAt,
					...tempUser
				} = createdUser;

				const role = await this.roleService.getRoleById(
					createdUser.roleId,
				);

				const user = {
					...tempUser,
					role: role.value,
				};

				// Создание JWT токена на основе payload
				const token = await this.tokenService.generateJwtToken(user);

				return { user, token };
			} else {
				throw new BadRequestException(AppErrors.USER_EXISTS);
			}
		} catch (error) {
			throw error;
		}
	}

	// Метод аутентификации пользователя
	public async loginUser(dto: LoginUserDto): Promise<AuthUserResponse> {
		try {
			// Получение объекта пользователя из базы данных по полю username
			const existUser = await this.userService.getUserByEmail(dto.email);

			// Проверка пользователя на его наличие в базе
			if (!existUser)
				throw new HttpException(
					AppErrors.USER_NO_EXISTS,
					HttpStatus.NOT_FOUND,
				);

			const validatePassword = await this.checkPassword(
				dto.password,
				existUser.password,
			);

			if (!validatePassword)
				throw new BadRequestException(AppErrors.INVALIAD_PASSWORD);

			// Диструкторизация полей объекта existUser без поля password, uuid, inserted_at и updated_at
			const {
				roleId,
				sexId,
				password,
				createdAt,
				updatedAt,
				...tempUser
			} = existUser;

			const role = await this.roleService.getRoleById(existUser.roleId);

			const user = {
				...tempUser,
				role: role.value,
			};

			// Создание JWT токена на основе payload
			const token = await this.tokenService.generateJwtToken(user);

			return { user, token };
		} catch (error) {
			// Обработка ошибок
			throw error;
		}
	}

	// Метод проверки пароля на валидность
	private async checkPassword(
		encryptedDtoPassword: string,
		encryptedUserPassword: string,
	): Promise<boolean> {
		try {
			return await bcrypt.compare(
				encryptedDtoPassword,
				encryptedUserPassword,
			);
		} catch (error) {
			throw new Error(AppErrors.DECRYPTION_ERROR);
		}
	}
}
