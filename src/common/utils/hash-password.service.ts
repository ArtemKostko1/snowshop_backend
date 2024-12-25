import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashPasswordService {
	// Метод зашифровки пароля в хэш
	async hashPassword(password: string): Promise<string> {
		try {
			return bcrypt.hash(password, 10);
		} catch (error) {
			throw new Error(error.toString());
		}
	}
}
