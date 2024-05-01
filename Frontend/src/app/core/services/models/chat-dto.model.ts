import { Attitude } from '../enums/attitude.enum';
import { ICharacterDto, ICharacterWithColorDto } from './character-dto.model';

export interface IChatDto {
  id: string;
  name: string;
  participants: ICharacterDto[];
  isCharacter2CurrentUser: boolean;
}

export interface IChatDetailsDto {
  id: string;
  name: string;
  additionalContext: string | null;
  character1: ICharacterDto;
  character2: ICharacterDto | null;
  character1Attitude: Attitude;
  character2Attitude: Attitude | null;
  isCharacter2CurrentUser: boolean;
}

export interface IMessageDto {
  id: string;
  sender: ICharacterWithColorDto;
  content: string;
  sentDate: Date;
}
