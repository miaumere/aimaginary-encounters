import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CharacterEntity } from 'src/entities/character.entity';
import { ChatEntity } from 'src/entities/chat.entity';
import { Attitude } from 'src/enums/attitude.enum';
import { IChatDetailsDto, IChatDto } from 'src/models/chat-dto.model';
import { IChatRequestDto } from 'src/models/chat-request.model';
import { Repository } from 'typeorm';

@Injectable()
export class ChatService {
	constructor(
		@InjectRepository(ChatEntity)
		private readonly _chatRepository: Repository<ChatEntity>,
		@InjectRepository(CharacterEntity)
		private readonly _charactersRepository: Repository<CharacterEntity>
	) {}

	async getChats() {
		const result: IChatDto[] = [];
		const chats = await this._chatRepository.find({
			relations: ['character1', 'character2'],
		});
		for (const chat of chats) {
			result.push({
				id: chat.id,
				name: chat.name,
				participants: [
					{
						id: chat.character1.id,
						name: chat.character1.name,
						image: chat.character1.image,
					},
					{
						id: chat.character2?.id,
						name: chat.character2?.name,
						image: chat.character2?.image,
					},
				],
				isCharacter2CurrentUser: chat.isCharacter2CurrentUser,
			});
		}

		return result;
	}

	async getChatDetails(id: string): Promise<IChatDetailsDto> {
		const chat = await this._chatRepository.findOne({
			relations: ['character1', 'character2'],
			where: {
				id,
			},
		});

		if (!chat) {
			throw new Error('Character not found');
		}

		const result: IChatDetailsDto = {
			id: chat.id,
			name: chat.name,
			additionalContext: chat.additionalContext,
			character1: {
				id: chat.character1.id,
				name: chat.character1.name,
				image: chat.character1.image,
			},
			character2: {
				id: chat.character2?.id,
				name: chat.character2?.name,
				image: chat.character2?.image,
			},
			character1Attitude: chat.character1Attitude,
			character2Attitude: chat.character2Attitude,
			isCharacter2CurrentUser: chat.isCharacter2CurrentUser,
		};

		return result;
	}

	async upsertChat(request: IChatRequestDto) {
		const chatEntity = request.id
			? await this._chatRepository.findOneBy({
					id: request.id,
				})
			: new ChatEntity();

		chatEntity.name = request.name;
		chatEntity.additionalContext = request.additionalContext;
		chatEntity.isCharacter2CurrentUser = request.isCharacter2CurrentUser;

		const char1: CharacterEntity =
			await this._charactersRepository.findOneBy({
				id: request.character1Id,
			});
		if (!char1) {
			throw new Error('Character not found');
		}
		chatEntity.character1 = char1;
		chatEntity.character1Attitude = Attitude[request.character1Attitude];

		if (!request.isCharacter2CurrentUser) {
			const char2: CharacterEntity =
				await this._charactersRepository.findOneBy({
					id: request.character2Id,
				});
			if (!char2) {
				throw new Error('Character not found');
			}
			chatEntity.character2 = char2;
			chatEntity.character2Attitude =
				Attitude[request.character2Attitude];
		}

		return await this._chatRepository.save(chatEntity);
	}

	async deleteChat(id: string) {
		return await this._chatRepository.delete(id);
	}
}
