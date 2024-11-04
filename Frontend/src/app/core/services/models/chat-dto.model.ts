import { Attitude } from '../enums/attitude.enum';
import { ICharacterDto, ICharacterWithColorDto } from './character-dto.model';

export interface IChatDto {
  id: string;
  name: string;
  participants: ICharacterDto[];
}

export interface IChatDetailsDto {
  id: string;
  name: string;
  additionalContext: string | null;
  character1: ICharacterDto;
  character2: ICharacterDto;
  character1Attitude: Attitude;
  character2Attitude: Attitude;
}

export interface IMessageDto {
  id: string;
  sender: ICharacterWithColorDto;
  content: string;
  sentDate: Date;
}

export interface IEditMessageRequestDto {
  content: string;
  chatId: string;
  messageId: string;
}

export interface ICreateMessageRequestDto {
  content: string;
  chatId: string;
  senderId: string;
}
