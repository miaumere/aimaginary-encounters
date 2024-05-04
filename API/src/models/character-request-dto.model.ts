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
	image: IFile;
}

export interface IFile {
	fieldname: string;
	originalname: string;
	encoding: string;
	mimetype: string;
	buffer: Buffer;
	size: number;
}
