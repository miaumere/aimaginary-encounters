import {
	Controller,
	Get,
	Param,
	Post,
	UseInterceptors,
	Body,
	UploadedFile,
	Delete,
	UseGuards,
	Patch,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import {
	IChatDetailsDto,
	IChatDto,
	ICreateMessageRequestDto,
	IEditMessageRequestDto,
} from '../models/chat-dto.model';
import { IChatRequestDto } from '../models/chat-request.model';
import { AuthGuard } from 'src/user/auth.guard';

@UseGuards(AuthGuard)
@Controller('api/chat')
export class ChatController {
	constructor(private readonly _chatService: ChatService) {}

	@Get()
	async getChats(): Promise<IChatDto[]> {
		return await this._chatService.getChats();
	}

	@Get(':id')
	async getChatDetails(@Param('id') id: string): Promise<IChatDetailsDto> {
		return await this._chatService.getChatDetails(id);
	}

	@Post()
	async upsertChat(@Body() request: IChatRequestDto) {
		return await this._chatService.upsertChat(request);
	}

	@Delete(':id')
	deleteChat(@Param('id') id: string) {
		return this._chatService.deleteChat(id);
	}

	@Get('messages/:id')
	async getChatMessages(@Param('id') id: string) {
		return await this._chatService.getChatMessages(id);
	}

	@Post('messages/:chatId/:characterId')
	async generateMessages(
		@Param('chatId') id: string,
		@Param('characterId') characterId: string
	) {
		return await this._chatService.generateMessages(id, characterId);
	}

	@Delete('messages/:chatId')
	async clearChatMessages(@Param('chatId') id: string) {
		return await this._chatService.clearChatMessages(id);
	}

	@Delete('messages/:chatId/:messageId')
	async deleteChatMessage(
		@Param('chatId') chatId: string,
		@Param('messageId') messageId: string
	) {
		return await this._chatService.deleteChatMessage(chatId, messageId);
	}

	@Patch('edit-message')
	async editChatMessage(@Body() request: IEditMessageRequestDto) {
		return await this._chatService.editChatMessage(request);
	}

	@Post('create-new-message')
	async sendMessage(@Body() request: ICreateMessageRequestDto) {
		return await this._chatService.sendMessage(request);
	}
}
