import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CharacterEntity } from './character.entity';
import { ChatEntity } from './chat.entity';

@Entity('message')
export class MessageEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	content: string;

	@Column()
	sentDate: Date = new Date();

	@ManyToOne(
		() => CharacterEntity,
		(character) => character.characterMessages
	)
	author: CharacterEntity;

	@ManyToOne(() => ChatEntity, (chat) => chat.messages)
	chat: ChatEntity;
}
