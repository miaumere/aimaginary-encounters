import { AttitudeString } from '../enums/attitude.enum';

export interface IChatRequestDto {
	id?: string;
	name: string;
	additionalContext: string | null;
	character1Id: string;
	character2Id: string | null;
	character1Attitude: AttitudeString;
	character2Attitude: AttitudeString | null;
	isCharacter2CurrentUser: boolean;
}
