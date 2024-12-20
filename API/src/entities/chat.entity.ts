import {
	Column,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { CharacterEntity } from './character.entity';
import { Attitude } from '../enums/attitude.enum';
import { MessageEntity } from './message.entity';
import { UserEntity } from './user.entity';

@Entity('chat')
export class ChatEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ length: 50 })
	name: string;

	@Column({ nullable: true, length: 250 })
	additionalContext: string;

	@ManyToOne(() => CharacterEntity, (character) => character.chatUser1)
	character1: CharacterEntity;

	@Column({
		type: 'enum',
		enum: Attitude,
		default: Attitude.Friendly,
	})
	character1Attitude: Attitude;

	@ManyToOne(() => CharacterEntity, (character) => character.chatUser2)
	character2: CharacterEntity;

	@Column({
		nullable: true,
		type: 'enum',
		enum: Attitude,
		default: null,
	})
	character2Attitude: Attitude;

	@Column()
	createdAt: Date = new Date();

	@OneToMany(() => MessageEntity, (msg) => msg.chat)
	messages: MessageEntity[];

	@ManyToOne(() => UserEntity, (user) => user)
	createdBy: UserEntity;
}
