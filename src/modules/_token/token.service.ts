import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
	constructor(
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService,
	) {}

	public async generateJwtToken(user): Promise<string> {
		try {
			const payload = {
				user: {
					id: user.id,
					userName: user.userName,
					name: user.name,
					role: user.role,
				},
			};

			return this.jwtService.sign(payload, {
				secret: this.configService.get('jwtSecret'),
				expiresIn: this.configService.get('jwtExpire'),
			});
		} catch (error) {
			console.error('Error generating JWT token', error);
			throw new Error('Error generating JWT token');
		}
	}
}
