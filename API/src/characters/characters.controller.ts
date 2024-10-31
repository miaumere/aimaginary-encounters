import {
	Get,
	Controller,
	Delete,
	Param,
	Post,
	UseInterceptors,
	UploadedFile,
	Body,
	UseGuards,
} from '@nestjs/common';
import { CharactersService } from './characters.service';
import {
	ICharacterDetails,
	ICharacterDto,
} from '../models/character-dto.model';
import { FileInterceptor } from '@nestjs/platform-express';
import {
	ICharacterRequestDto,
	IFile,
} from '../models/character-request-dto.model';
import { AuthGuard } from 'src/user/auth.guard';

@UseGuards(AuthGuard)
@Controller('api/characters')
export class CharactersController {
	constructor(private readonly _charactersService: CharactersService) {}

	@Get()
	async getCharacterList(): Promise<ICharacterDto[]> {
		return await this._charactersService.getCharacterList();
	}

	@Get(':id')
	async getCharacter(@Param('id') id: string): Promise<ICharacterDetails> {
		return await this._charactersService.getCharacter(id);
	}

	@Post()
	@UseInterceptors(FileInterceptor('image'))
	async upsertCharacter(
		@Body() body: ICharacterRequestDto,
		@UploadedFile() file: IFile
	) {
		return await this._charactersService.upsertCharacter(body, file);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this._charactersService.deleteCharacter(id);
	}
}
