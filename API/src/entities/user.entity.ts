import {
	BeforeInsert,
	Column,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { CharacterEntity } from './character.entity';
const argon2 = require('argon2');

@Entity('user')
export class UserEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	username: string;

	@Column()
	password: string;

	@BeforeInsert()
	async hashPassword() {
		try {
			this.password = await argon2.hash(this.password);
		} catch (err) {
			console.error(err);
		}
	}

	@OneToMany(() => CharacterEntity, (character) => character.createdBy)
	characters: CharacterEntity[];
}
