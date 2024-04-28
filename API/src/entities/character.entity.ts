import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}
