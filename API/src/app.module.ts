import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CharactersModule } from './characters/characters.module';
import { ConfigModule } from '@nestjs/config';
import { ChatModule } from './chat/chat.module';

const ENV = process.env.NODE_ENV;

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: !ENV ? '.env' : `.env.${ENV}`,
		}),
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: process.env.DB_HOST,
			port: parseInt(process.env.DB_PORT, 10),
			username: process.env.DB_USERNAME,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_DATABASE,
			entities: [__dirname + '/**/*.entity{.ts,.js}'],
			synchronize: true,
		}),
		CharactersModule,
		ChatModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
