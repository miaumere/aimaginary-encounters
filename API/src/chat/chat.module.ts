import { Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { CharacterEntity } from '../entities/character.entity';
import { ChatEntity } from '../entities/chat.entity';
import { MessageEntity } from '../entities/message.entity';
import { AiHelperService } from '../shared/ai-helper.service';

@Module({
	imports: [
		TypeOrmModule.forFeature([ChatEntity, CharacterEntity, MessageEntity]),
	],
	providers: [ChatService, AiHelperService],
	controllers: [ChatController],
	exports: [],
})
export class ChatModule implements NestModule {
	public configure() {}
}
