import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	OneToMany,
	JoinColumn,
} from 'typeorm';
import { ChatEntity } from './chat.entity';

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

	@OneToMany(() => ChatEntity, (chat) => chat.character1)
	chatUser1: CharacterEntity;

	@OneToMany(() => ChatEntity, (chat) => chat.character2)
	chatUser2: CharacterEntity;

	@Column()
	createdAt: Date = new Date();

	// TODO: auth
	// @Column()
	// createdBy: string;
}
