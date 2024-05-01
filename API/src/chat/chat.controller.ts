import {
	Controller,
	Get,
	Param,
	Post,
	UseInterceptors,
	Body,
	UploadedFile,
	Delete,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { IChatDetailsDto, IChatDto } from 'src/models/chat-dto.model';
import { IChatRequestDto } from 'src/models/chat-request.model';

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

	@Post('messages/:chatId')
	async generateMessages(@Param('chatId') id: string) {
		return await this._chatService.generateMessages(id);
	}
}
