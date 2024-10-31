import { Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { CharacterEntity } from '../entities/character.entity';
import { ChatEntity } from '../entities/chat.entity';
import { AiHelperService } from '../shared/ai-helper.service';
import { UserEntity } from 'src/entities/user.entity';
import { MessageEntity } from 'src/entities/message.entity';
import { UserService } from 'src/user/user.service';

@Module({
	imports: [
		TypeOrmModule.forFeature([
			ChatEntity,
			CharacterEntity,
			MessageEntity,
			UserEntity,
		]),
	],
	providers: [ChatService, AiHelperService, UserService],
	controllers: [ChatController],
	exports: [],
})
export class ChatModule implements NestModule {
	public configure() {}
}
