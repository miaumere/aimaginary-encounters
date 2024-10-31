import { CharacterEntity } from './../entities/character.entity';
import { Module, NestModule } from '@nestjs/common';
import { CharactersService } from './characters.service';
import { CharactersController } from './characters.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { UserEntity } from 'src/entities/user.entity';
import { ChatEntity } from 'src/entities/chat.entity';
import { MessageEntity } from 'src/entities/message.entity';

@Module({
	imports: [
		TypeOrmModule.forFeature([
			CharacterEntity,
			UserEntity,
			ChatEntity,
			MessageEntity,
		]),
	],
	providers: [CharactersService, UserService],
	controllers: [CharactersController],
	exports: [],
})
export class CharactersModule implements NestModule {
	public configure() {}
}
