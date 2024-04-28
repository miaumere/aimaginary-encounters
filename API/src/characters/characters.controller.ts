import {
	Get,
	Controller,
	Delete,
	Param,
	Post,
	UseInterceptors,
	UploadedFile,
	Body,
} from '@nestjs/common';
import { CharactersService } from './characters.service';
import { ICharacterDto } from 'src/models/character-dto.model';
import { FileInterceptor } from '@nestjs/platform-express';
import { ICharacterRequestDto } from 'src/models/character-request-dto.model';

@Controller('api/characters')
export class CharactersController {
	constructor(private readonly _charactersService: CharactersService) {}

	@Get()
	async getCharacterList(): Promise<ICharacterDto[]> {
		return await this._charactersService.getCharacterList();
	}

	@Get(':id')
	async getCharacter(@Param('id') id: string): Promise<ICharacterDto> {
		return await this._charactersService.getCharacter(id);
	}

	@Post()
	@UseInterceptors(FileInterceptor('image'))
	async upserCharacter(
		@Body() body: ICharacterRequestDto,
		@UploadedFile() file: Express.Multer.File
	) {
		return await this._charactersService.upsertCharacter(body, file);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this._charactersService.deleteCharacter(id);
	}
}
