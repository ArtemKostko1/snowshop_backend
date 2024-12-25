//import { Role } from 'src/common/constants/role.enum';

export interface IJwtPaylod {
	user: IUserJWT;
	iat: number;
	exp: number;
}

export interface IUserJWT {
	id: number;
	username: string;
	//role: Role;
}
