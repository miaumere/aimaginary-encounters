import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CharacterEntity } from '../entities/character.entity';
import { ChatEntity } from '../entities/chat.entity';
import { MessageEntity } from '../entities/message.entity';
import { Attitude } from '../enums/attitude.enum';
import {
	IChatDetailsDto,
	IChatDto,
	ICreateMessageRequestDto,
	IEditMessageRequestDto,
} from '../models/chat-dto.model';
import { IChatRequestDto } from '../models/chat-request.model';
import { AiHelperService } from '../shared/ai-helper.service';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ChatService {
	constructor(
		@InjectRepository(ChatEntity)
		private readonly _chatRepository: Repository<ChatEntity>,
		@InjectRepository(CharacterEntity)
		private readonly _charactersRepository: Repository<CharacterEntity>,
		@InjectRepository(MessageEntity)
		private readonly _messagesRepository: Repository<MessageEntity>,
		private readonly _aiHelperService: AiHelperService,
		private readonly _userService: UserService
	) {}

	async getChats() {
		const result: IChatDto[] = [];
		const currentUser = this._userService.currentUser$.getValue();

		const chats = await this._chatRepository.find({
			relations: ['character1', 'character2'],
			where: {
				createdBy: currentUser,
			},
		});

		if (!chats) {
			return result;
		}

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
			});
		}

		return result;
	}

	async getChatDetails(id: string): Promise<IChatDetailsDto> {
		const chat = await this._chatRepository.findOne({
			relations: ['character1', 'character2', 'createdBy'],
			where: {
				id,
			},
		});

		if (!chat) {
			throw new Error('Chat not found');
		}
		if (
			chat.createdBy.id !== this._userService.currentUser$.getValue().id
		) {
			throw new Error('You can only view your own chats');
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

		const char1: CharacterEntity =
			await this._charactersRepository.findOneBy({
				id: request.character1Id,
			});
		if (!char1) {
			throw new Error('Character not found');
		}
		chatEntity.character1 = char1;
		chatEntity.character1Attitude = Attitude[request.character1Attitude];

		const char2: CharacterEntity =
			await this._charactersRepository.findOneBy({
				id: request.character2Id,
			});
		if (!char2) {
			throw new Error('Character not found');
		}
		chatEntity.character2 = char2;
		chatEntity.character2Attitude = Attitude[request.character2Attitude];

		chatEntity.createdBy = this._userService.currentUser$.getValue();

		return await this._chatRepository.save(chatEntity);
	}

	async deleteChat(id: string) {
		const currentUser = this._userService.currentUser$.getValue();
		const chat = await this._chatRepository.findOne({
			relations: ['createdBy'],
			where: { id },
		});

		if (!chat) {
			throw new Error('Chat not found');
		}
		if (chat.createdBy.id !== currentUser.id) {
			throw new Error('You can only delete your own chats');
		}
		const messages = await this._messagesRepository.find({
			where: { chat },
		});
		this._messagesRepository.remove(messages);

		return await this._chatRepository.delete(id);
	}

	async getChatMessages(id: string) {
		const currentUser = this._userService.currentUser$.getValue();
		const chat = await this._chatRepository.findOne({
			relations: ['messages', 'messages.author', 'createdBy'],
			where: {
				id,
			},
		});

		if (!chat) {
			throw new Error('Chat not found');
		}

		if (chat.createdBy.id !== currentUser.id) {
			throw new Error('You can only view your own chat messages');
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

	async generateMessages(chatId: string, characterId: string) {
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

		if (!chat) {
			throw new Error('Chat not found');
		}

		const message = new MessageEntity();

		const character = await this._charactersRepository.findOneBy({
			id: characterId,
		});
		if (!character) {
			throw new Error('Character not found');
		}

		const last5Messages = await this._messagesRepository.find({
			where: {
				chat: chat,
			},
			order: {
				sentDate: 'DESC',
			},
			take: 5,
		});

		last5Messages.reverse();

		message.content = await this._aiHelperService.getAiResponse(
			character,
			chat,
			chat.character1.id
				? chat.character2Attitude
				: chat.character1Attitude,
			last5Messages
		);

		message.sentDate = new Date();
		message.author = character;

		await this._messagesRepository.save(message);
		chat.messages.push(message);
		await this._chatRepository.save(chat);
	}

	async clearChatMessages(chatId: string) {
		const chat = await this._chatRepository.findOne({
			relations: ['messages', 'createdBy'],
			where: {
				id: chatId,
			},
		});

		if (!chat) {
			throw new Error('Chat not found');
		}
		if (
			chat.createdBy.id !== this._userService.currentUser$.getValue().id
		) {
			throw new Error('You can only clear your own chat messages');
		}

		await this._messagesRepository.remove(chat.messages);
		chat.messages = [];
		await this._chatRepository.save(chat);
	}

	async deleteChatMessage(chatId: string, messageId: string) {
		const message = await this._messagesRepository.findOne({
			relations: ['chat', 'chat.createdBy'],
			where: {
				id: messageId,
				chat: {
					id: chatId,
					createdBy: this._userService.currentUser$.getValue(),
				},
			},
		});
		if (!message) {
			throw new Error('Message not found');
		}

		const chat = await this._chatRepository.findOne({
			relations: ['messages'],
			where: {
				id: chatId,
			},
		});

		chat.messages = chat.messages.filter((m) => m.id !== message.id);

		await this._messagesRepository.remove(message);
		await this._chatRepository.save(chat);
	}

	async editChatMessage(request: IEditMessageRequestDto) {
		const message = await this._messagesRepository.findOne({
			relations: ['chat', 'chat.createdBy'],
			where: {
				id: request.messageId,
				chat: {
					id: request.chatId,
					createdBy: this._userService.currentUser$.getValue(),
				},
			},
		});
		if (!message) {
			throw new Error('Message not found');
		}
		message.content = request.content;
		await this._messagesRepository.save(message);
	}

	async sendMessage(request: ICreateMessageRequestDto) {
		const message = new MessageEntity();

		message.author = await this._charactersRepository.findOneBy({
			id: request.senderId,
		});

		if (!message.author) {
			throw new Error('Character not found');
		}
		message.chat = await this._chatRepository.findOneBy({
			id: request.chatId,
		});
		if (!message.chat) {
			throw new Error('Chat not found');
		}
		message.content = request.content;
		message.sentDate = new Date();

		await this._messagesRepository.save(message);

		return;
	}
}
