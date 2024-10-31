import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	OneToMany,
	JoinColumn,
	ManyToOne,
} from 'typeorm';
import { ChatEntity } from './chat.entity';
import { MessageEntity } from './message.entity';
import { UserEntity } from './user.entity';

@Entity('character')
export class CharacterEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ length: 50 })
	name: string;

	@Column({ nullable: true, length: 10 })
	age: string;

	@Column({ nullable: true, length: 50 })
	gender: string;

	@Column({ length: 250 })
	backstory: string;

	@Column({ length: 50 })
	positiveTraits: string;

	@Column({ length: 50 })
	negativeTraits: string;

	@Column({ length: 50 })
	skills: string;

	@Column({ nullable: true })
	image: string;

	@Column({ length: 8 })
	color: string;

	@Column()
	createdAt: Date = new Date();

	@OneToMany(() => ChatEntity, (chat) => chat.character1)
	chatUser1: CharacterEntity;

	@OneToMany(() => ChatEntity, (chat) => chat.character2)
	chatUser2: CharacterEntity;

	@OneToMany(() => MessageEntity, (msg) => msg.author)
	characterMessages: CharacterEntity;

	@ManyToOne(() => UserEntity, (user) => user)
	createdBy: UserEntity;
}
