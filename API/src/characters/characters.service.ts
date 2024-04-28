import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CharacterEntity } from 'src/entities/character.entity';
import { ICharacterDto } from 'src/models/character-dto.model';
import { ICharacterRequestDto } from 'src/models/character-request-dto.model';
import { Repository } from 'typeorm';
const sharp = require('sharp');

@Injectable()
export class CharactersService {
	constructor(
		@InjectRepository(CharacterEntity)
		private readonly _charactersRepository: Repository<CharacterEntity>
	) {}

	async getCharacterList(): Promise<ICharacterDto[]> {
		const characters = await this._charactersRepository.find({
			order: {
				name: 'ASC',
			},
		});
		return characters.map((character) => {
			return {
				id: character.id,
				name: character.name,
				image: character.image,
			};
		});
	}

	async getCharacter(id: string): Promise<ICharacterDto> {
		const character = await this._charactersRepository.findOneBy({
			id,
		});
		if (!character) {
			throw new Error('Character not found');
		}

		return character;
	}

	async upsertCharacter(
		character: ICharacterRequestDto,
		file: Express.Multer.File
	) {
		const characterEntity = character.id
			? await this._charactersRepository.findOneBy({
					id: character.id,
				})
			: new CharacterEntity();

		characterEntity.name = character.name;
		characterEntity.age = character.age;
		characterEntity.backstory = character.backstory;
		characterEntity.positiveTraits = character.positiveTraits;
		characterEntity.negativeTraits = character.negativeTraits;
		characterEntity.skills = character.skills;
		characterEntity.color = character.color;

		if (file) {
			await sharp(file.buffer)
				.resize(100, 100)
				.toBuffer()
				.then((resizedImage) => {
					const base64 = resizedImage.toString('base64');
					const mimeType = file.mimetype;
					const fullBase64 = `data:${mimeType};base64,${base64}`;
					characterEntity.image = fullBase64;
				});
		}

		return await this._charactersRepository.save(characterEntity);
	}

	async deleteCharacter(id: string) {
		return await this._charactersRepository.delete(id);
	}
}
