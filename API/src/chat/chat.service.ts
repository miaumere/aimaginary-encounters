import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CharacterEntity } from '../entities/character.entity';
import { ChatEntity } from '../entities/chat.entity';
import { MessageEntity } from '../entities/message.entity';
import { Attitude } from '../enums/attitude.enum';
import { IChatDetailsDto, IChatDto } from '../models/chat-dto.model';
import { IChatRequestDto } from '../models/chat-request.model';
import { AiHelperService } from '../shared/ai-helper.service';
import { Repository } from 'typeorm';

@Injectable()
export class ChatService {
	constructor(
		@InjectRepository(ChatEntity)
		private readonly _chatRepository: Repository<ChatEntity>,
		@InjectRepository(CharacterEntity)
		private readonly _charactersRepository: Repository<CharacterEntity>,
		@InjectRepository(MessageEntity)
		private readonly _messagesRepository: Repository<MessageEntity>,
		private readonly _aiHelperService: AiHelperService
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

	async getChatMessages(id: string) {
		const chat = await this._chatRepository.findOne({
			relations: ['messages', 'messages.author'],
			where: {
				id,
			},
		});

		if (!chat) {
			throw new Error('Chat not found');
		}
		const messages = chat.messages;

		const result = messages
			.map((message) => {
				return {
					id: message.id,
					sender: {
						id: message.author.id,
						name: message.author.name,
						image: message.author.image,
						color: message.author.color,
					},
					content: message.content,
					sentDate: message.sentDate,
				};
			})
			.sort((a, b) => a.sentDate.getTime() - b.sentDate.getTime());

		return result;
	}

	async generateMessages(chatId: string) {
		const chat = await this._chatRepository.findOne({
			relations: [
				'messages',
				'character1',
				'character2',
				'messages.author',
			],
			where: {
				id: chatId,
			},
		});

		const lastMessage = chat?.messages[chat.messages.length - 1];

		if (!chat) {
			throw new Error('Chat not found');
		}

		const message = new MessageEntity();

		const character =
			lastMessage?.author.id === chat.character1.id
				? chat.character2
				: chat.character1;

		message.content = await this._aiHelperService.getAiResponse(
			character,
			chat,
			chat.character1.id
				? chat.character2Attitude
				: chat.character1Attitude
		);

		message.sentDate = new Date();
		message.author = character;

		await this._messagesRepository.save(message);
		chat.messages.push(message);
		await this._chatRepository.save(chat);
	}
}
