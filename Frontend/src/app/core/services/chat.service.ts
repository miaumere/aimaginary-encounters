import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {
  IChatDetailsDto,
  IChatDto,
  ICreateMessageRequestDto,
  IEditMessageRequestDto,
  IMessageDto,
} from './models/chat-dto.model';
import { IChatRequestDto } from './models/chat-request.model';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private _baseUrl = '/api/chat';

  constructor(private http: HttpClient) {}

  getChats() {
    return this.http.get<IChatDto[]>(`${this._baseUrl}`);
  }

  getChatDetails(id: string) {
    return this.http.get<IChatDetailsDto>(`${this._baseUrl}/${id}`);
  }

  upsertChat(request: IChatRequestDto) {
    return this.http.post<IChatRequestDto>(`${this._baseUrl}`, request);
  }

  deleteChat(id: string) {
    return this.http.delete(`${this._baseUrl}/${id}`);
  }

  getChatMessages(id: string) {
    return this.http.get<IMessageDto[]>(`${this._baseUrl}/messages/${id}`);
  }

  generateMessages(chatId: string, characterId: string) {
    return this.http.post<IMessageDto[]>(
      `${this._baseUrl}/messages/${chatId}/${characterId}`,
      {}
    );
  }

  clearChatMessages(chatId: string) {
    return this.http.delete(`${this._baseUrl}/messages/${chatId}`);
  }

  deleteChatMessage(chatId: string, messageId: string) {
    return this.http.delete(`${this._baseUrl}/messages/${chatId}/${messageId}`);
  }

  editChatMessage(request: IEditMessageRequestDto) {
    return this.http.patch<IMessageDto>(
      `${this._baseUrl}/edit-message`,
      request
    );
  }

  sendMessage(request: ICreateMessageRequestDto) {
    return this.http.post<IMessageDto>(
      `${this._baseUrl}/create-new-message`,
      request
    );
  }
}
