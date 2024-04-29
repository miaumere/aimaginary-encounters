import { Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { CharacterEntity } from 'src/entities/character.entity';
import { ChatEntity } from 'src/entities/chat.entity';

@Module({
	imports: [TypeOrmModule.forFeature([ChatEntity, CharacterEntity])],
	providers: [ChatService],
	controllers: [ChatController],
	exports: [],
})
export class ChatModule implements NestModule {
	public configure() {}
}
