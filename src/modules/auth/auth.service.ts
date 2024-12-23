import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TokenService } from '../token/token.service';
import { UsersService } from '../users/users.service';
import { LoginUserDto, RegisterUserDto } from './dto/auth.dto';
import { AppErrors } from '../../common/errors/errors';
import { Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { AuthUserResponse } from './dto/responses/auth.response';
import { HashPasswordService } from '../../common/utils/hash-password.service';
import { RolesService } from '../roles/roles.service';
//import * as NodeRSA from 'node-rsa';

@Injectable()
export class AuthService {
  //export class AuthService implements OnModuleInit {
  private publicKey: string | Buffer;
  private privateKey: string | Buffer;
  private logger = new Logger('AuthService');

  constructor(
    private readonly prismaService: PrismaService,
    private readonly usersService: UsersService,
    private readonly tokenService: TokenService,
    private readonly rolesService: RolesService,
    private readonly hashPasswordService: HashPasswordService,
  ) {}

  // Метод вызываемый при загрузке модуля
  // async onModuleInit() {
  //   await this.generateKeyPair();
  // }

  // Метод генерации пары ключей для шифрования
  // private generateKeyPair() {
  //   // const key = new NodeRSA({ b: 2048 });
  //   // this.publicKey = key.exportKey('public');
  //   // this.privateKey = key.exportKey('private');

  //   const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
  //     modulusLength: 2048,
  //   });

  //   this.privateKey = privateKey.export({ type: 'pkcs1', format: 'pem' });
  //   this.publicKey = publicKey.export({ type: 'spki', format: 'pem' });
  // }

  // Метод получения публичного ключа
  // public getPublicKey() {
  //   return this.publicKey;
  // }

  // Метод регистрации пользователя
  public async registerUser(dto: RegisterUserDto): Promise<AuthUserResponse> {
    try {
      // Получение обьъекта user из базы данных по полю username
      const existUser = await this.usersService.getUserByUsername(dto.username);

      // Проверка пользователя на его наличие в базе
      if (!existUser) {
        // Создание пользователя в базе данных и получение его объекта
        const createdUser = await this.usersService.createUser(dto);

        // Диструкторизация полей объекта existUser без поля password, uuid, inserted_at и updated_at
        const { role_id, inserted_at, updated_at, ...tempUser } = createdUser;

        const role = await this.rolesService.getRoleById(existUser.role_id);

        const user = {
          ...tempUser,
          role: role.name
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
      const existUser = await this.usersService.getUserByUsername(dto.username);

      // Проверка пользователя на его наличие в базе
      if (!existUser)
        throw new HttpException(AppErrors.USER_NO_EXISTS, HttpStatus.NOT_FOUND);

      const validatePassword = await this.checkPassword(
        dto.password,
        existUser.password,
      );

      if (!validatePassword)
        throw new BadRequestException(AppErrors.INVALIAD_PASSWORD);

      // Диструкторизация полей объекта existUser без поля password, uuid, inserted_at и updated_at
      const { uuid, password, role_id, inserted_at, updated_at, ...tempUser } =
        existUser;

      const role = await this.rolesService.getRoleById(existUser.role_id);

      const user = {
        ...tempUser,
        role: role.name,
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
      // const decryptedDtoPassword = crypto
      //   .privateDecrypt(this.privateKey, Buffer.from(encryptedDtoPassword))
      //   .toString('utf-8');

      return await bcrypt.compare(encryptedDtoPassword, encryptedUserPassword);
    } catch (error) {
      throw new Error(AppErrors.DECRYPTION_ERROR);
    }
  }

  // Node-rsa
  //   private async checkPassword(encryptedDtoPassword: string, encryptedUserPassword: string): Promise<boolean> {
  //     try {
  //       const key = new NodeRSA(this.privateKey);
  //       const decryptedDtoPassword = key.decrypt(encryptedDtoPassword, 'utf8');
  //       return await bcrypt.compare(decryptedDtoPassword, encryptedUserPassword);
  //     } catch (error) {
  //       throw new Error(AppErrors.DECRYPTION_ERROR);
  //     }
  //   }
}
