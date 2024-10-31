import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { ILoginRequestDto } from 'src/models/login-request-dto.model';

@Controller('api/auth')
export class UserController {
	constructor(private readonly _userService: UserService) {}

	@Post()
	async login(@Body() request: ILoginRequestDto): Promise<string> {
		return await this._userService.login(request);
	}

	@Post('register')
	async register(@Body() request: ILoginRequestDto): Promise<string> {
		return await this._userService.register(request);
	}
}
