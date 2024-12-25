import {
	CanActivate,
	ExecutionContext,
	ForbiddenException,
	Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
//import { Role } from 'src/common/constants/role.enum';
//import { ROLES_KEY } from 'src/common/decorators/decorators';

// @Injectable()
// export class RolesGuard implements CanActivate {
// 	constructor(private reflector: Reflector) {}

// 	canActivate(context: ExecutionContext): boolean {
// 		const requiredRoles = this.reflector.getAllAndOverride<Role[]>(
// 			ROLES_KEY,
// 			[context.getHandler(), context.getClass()],
// 		);
// 		if (!requiredRoles) {
// 			return true;
// 		}

// 		const { user } = context.switchToHttp().getRequest();

// 		if (!user || !user.role) {
// 			console.log('No user or role information available');
// 			throw new ForbiddenException(
// 				'No user or role information available',
// 			);
// 		}

// 		const hasRole = requiredRoles.some((role) => {
// 			return user.role === role;
// 		});

// 		if (!hasRole) {
// 			console.log('User role does not match any of the required roles');
// 			throw new ForbiddenException(
// 				'You do not have permission to access this resource',
// 			);
// 		}

// 		return hasRole;
// 	}
// }
