export interface ICharacterRequestDto {
	id?: string;
	name: string;
	age?: string;
	gender?: string;
	backstory: string;
	positiveTraits: string;
	negativeTraits: string;
	skills: string;
	color: string;
	image: Express.Multer.File;
}
