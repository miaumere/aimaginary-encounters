import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('character')
export class CharacterEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	tag: string;
}
