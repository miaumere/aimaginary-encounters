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
	character2: ICharacterDto | null;
	character1Attitude: Attitude;
	character2Attitude: Attitude | null;
}

export interface IMessageDto {
	id: string;
	sender: ICharacterWithColorDto;
	content: string;
	sentDate: Date;
}
