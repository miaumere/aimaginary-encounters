import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CharacterEntity } from './character.entity';
import { Attitude } from 'src/enums/attitude.enum';

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

	@Column({ default: false })
	isCharacter2CurrentUser: boolean;

	@Column()
	createdAt: Date = new Date();

	// TODO: auth
	// @Column()
	// createdBy: string;
}
