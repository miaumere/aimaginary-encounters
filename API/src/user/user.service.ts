import {
	HttpException,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { ILoginRequestDto } from 'src/models/login-request-dto.model';
import { Repository } from 'typeorm';
import * as argon2 from 'argon2';
import { BehaviorSubject } from 'rxjs';

const jwt = require('jsonwebtoken');

@Injectable()
export class UserService {
	currentUser$ = new BehaviorSubject<UserEntity>(null);

	constructor(
		@InjectRepository(UserEntity)
		private readonly _userRepository: Repository<UserEntity>
	) {}

	async getUserById(id: string): Promise<UserEntity> {
		return this._userRepository.findOneBy({ id });
	}

	private async _getUserByLoginRequest(
		loginRequest: ILoginRequestDto
	): Promise<UserEntity> {
		const user = await this._userRepository.findOneBy({
			username: loginRequest.username,
		});
		if (!user) {
			return null;
		}

		if (await argon2.verify(user.password, loginRequest.password)) {
			return user;
		}

		return null;
	}

	async login(request: ILoginRequestDto) {
		const user = await this._getUserByLoginRequest(request);

		if (!user) {
			throw new UnauthorizedException();
		}

		return this._generateJWTTokenForUser(user);
	}

	async register(request: ILoginRequestDto) {
		let user = await this._userRepository.findOneBy({
			username: request.username,
		});
		if (user) {
			const errors = { User: ' with the same username exists' };
			throw new HttpException({ errors }, 400);
		}
		user = new UserEntity();
		user.username = request.username;
		user.password = request.password;
		await this._userRepository.save(user);

		return this._generateJWTTokenForUser(user);
	}

	private _generateJWTTokenForUser(user): string {
		let today = new Date();
		let exp = new Date(today);
		exp.setDate(today.getDate() + 60);

		return jwt.sign(
			{
				id: user.id,
				username: user.username,
				exp: exp.getTime() / 1000,
			},
			process.env.SECRET
		);
	}

	async validateToken(token: string) {
		try {
			return jwt.verify(token, process.env.SECRET);
		} catch (e) {
			console.error(e);
			throw new UnauthorizedException();
		}
	}
}
