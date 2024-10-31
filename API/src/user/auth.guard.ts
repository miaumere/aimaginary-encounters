import {
	Injectable,
	CanActivate,
	ExecutionContext,
	UnauthorizedException,
	ForbiddenException,
} from '@nestjs/common';
import { UserService } from './user.service';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private readonly _userService: UserService) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		try {
			const request = context.switchToHttp().getRequest();
			const { authorization }: any = request.headers;
			if (!authorization || authorization.trim() === '') {
				throw new UnauthorizedException('Please provide token');
			}
			const authToken = authorization.replace(/bearer/gim, '').trim();
			const resp = await this._userService.validateToken(authToken);
			request.decodedData = resp;

			const user = await this._userService.getUserById(
				request.decodedData.id
			);
			if (!user) {
				throw new UnauthorizedException('User not found');
			}
			this._userService.currentUser$.next(user);

			return true;
		} catch (error) {
			console.error('auth error - ', error.message);
			throw new ForbiddenException(
				error.message || 'session expired! Please sign In'
			);
		}
	}
}
