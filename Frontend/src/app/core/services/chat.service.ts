import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICharacterDetails, ICharacterDto } from './models/character-dto.model';
import { ICharacterRequestDto } from './models/character-request-dto.model';
import { Observable } from 'rxjs';
import { IChatDetailsDto, IChatDto } from './models/chat-dto.model';
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
}
