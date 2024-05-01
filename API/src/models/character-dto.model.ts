export interface ICharacterDto {
	id: string;
	name: string;
	image: string | null;
}

export interface ICharacterDetails extends ICharacterDto {
	age: string;
	gender?: string;
	backstory: string;
	skills: string;
	positiveTraits: string;
	negativeTraits: string;
	color: string;
}

export interface ICharacterWithColorDto {
	id: string;
	name: string;
	image: string | null;
	color: string;
}
