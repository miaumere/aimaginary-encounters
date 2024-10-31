import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CharacterEntity } from '../entities/character.entity';
import {
	ICharacterDetails,
	ICharacterDto,
} from '../models/character-dto.model';
import {
	ICharacterRequestDto,
	IFile,
} from '../models/character-request-dto.model';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { throws } from 'assert';
import { ChatEntity } from 'src/entities/chat.entity';
import { MessageEntity } from 'src/entities/message.entity';

const sharp = require('sharp');

@Injectable()
export class CharactersService {
	constructor(
		@InjectRepository(CharacterEntity)
		private readonly _charactersRepository: Repository<CharacterEntity>,
		@InjectRepository(ChatEntity)
		private readonly _chatsRepository: Repository<ChatEntity>,
		@InjectRepository(MessageEntity)
		private readonly _messagesRepository: Repository<MessageEntity>,
		private readonly _userService: UserService
	) {}

	async getCharacterList(): Promise<ICharacterDto[]> {
		const currentUser = this._userService.currentUser$.getValue();

		const characters = await this._charactersRepository.find({
			order: {
				name: 'ASC',
			},
			where: {
				createdBy: currentUser,
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

	async getCharacter(id: string): Promise<ICharacterDetails> {
		const character = await this._charactersRepository.findOneBy({
			id,
		});
		if (!character) {
			throw new Error('Character not found');
		}

		return character;
	}

	async upsertCharacter(character: ICharacterRequestDto, file: IFile) {
		const characterEntity = character.id
			? await this._charactersRepository.findOneBy({
					id: character.id,
				})
			: new CharacterEntity();

		characterEntity.name = character.name;
		characterEntity.age = character.age;
		characterEntity.gender = character.gender;
		characterEntity.backstory = character.backstory;
		characterEntity.positiveTraits = character.positiveTraits;
		characterEntity.negativeTraits = character.negativeTraits;
		characterEntity.skills = character.skills;
		characterEntity.color = character.color;
		characterEntity.createdBy = this._userService.currentUser$.getValue();

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
		const character = await this._charactersRepository.findOne({
			relations: ['createdBy'],
			where: { id },
		});

		if (!character) {
			throw new Error('Character not found');
		}

		const currentUser = this._userService.currentUser$.getValue();

		if (character.createdBy.id !== currentUser.id) {
			throw new Error('You can only delete your own characters');
		}

		const chats = await this._chatsRepository.find({
			where: [{ character1: character }, { character2: character }],
		});

		if (chats.length) {
			for (const chat of chats) {
				const messages = await this._messagesRepository.find({
					where: { chat },
				});
				await this._messagesRepository.remove(messages);
			}
			await this._chatsRepository.remove(chats);
		}
		return await this._charactersRepository.delete(id);
	}
}
