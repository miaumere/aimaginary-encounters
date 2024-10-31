import { NestModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
	imports: [TypeOrmModule.forFeature([UserEntity])],
	providers: [UserService],
	controllers: [UserController],
	exports: [UserService],
})
export class UserModule implements NestModule {
	public configure() {}

	// public configure(consumer: MiddlewareConsumer) {
	// 	consumer
	// 		.apply(AuthMiddleware)
	// 		.forRoutes(
	// 			{ path: 'user', method: RequestMethod.GET },
	// 			{ path: 'user', method: RequestMethod.PUT }
	// 		);
	// }
}
