import { HttpException, HttpStatus } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { log } from 'console';

export class PrismaKnownException extends HttpException {
  constructor(error: PrismaClientKnownRequestError) {
    let status: HttpStatus;
    let message: string;

    switch (error.code) {
      case 'P2002': // Уникальность полей в записях
        status = HttpStatus.CONFLICT;
        message = 'Запись с такими же уникальными полями уже создана';
        log(`Запись с такими же уникальными полями уже создана: ERROR_CODE - ${error.code}. `, error)
        break;
      case 'P2003': // Удаление записи невозможно, так как на неё ссылаются другие записи
        status = HttpStatus.BAD_REQUEST;
        message = 'Невозможно удалить запись, так как на неё ссылаются другие записи';
        log(`Невозможно удалить запись, так как на неё ссылаются другие записи: ERROR_CODE - ${error.code}. `, error)
        break;
      case 'P2025': // Запись с указанным полем не найдена
        status = HttpStatus.BAD_REQUEST;
        message = 'Запись с указанным идинетификатором не найдена';
        log(`Запись с указанным идинетификатором не найдена: ERROR_CODE - ${error.code}. `, error)
        break;
      default:
        log(`Произошла ошибка в базе данных: ERROR_CODE - ${error.code}. `, error)
        message = 'Произошла ошибка в базе данных';
        break;
    }

    super(message, status);
  }
}
