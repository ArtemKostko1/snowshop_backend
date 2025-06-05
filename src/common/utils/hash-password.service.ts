import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashPasswordService {
	// Метод зашифровки пароля в хэш
	public async hashPassword(password: string): Promise<string> {
		// Генерация соли
		const salt = await bcrypt.genSalt(10);
		// Хеширование пароля с использованием соли
		return await bcrypt.hash(password, salt);
	}

	public async comparePasswords(
		plainTextPassword: string,
		hashedPassword: string,
	): Promise<boolean> {
		// Сравнение простого пароля с хешированным
		return await bcrypt.compare(plainTextPassword, hashedPassword);
	}
}
