import { Get, Controller } from '@nestjs/common';
import { CharactersService } from './characters.service';

// import { TagEntity } from './tag.entity';
// import { TagService } from './tag.service';

// import {
//   ApiBearerAuth, ApiTags,
// } from '@nestjs/swagger';

@Controller('api/characters')
export class TagController {
	constructor(private readonly _charactersService: CharactersService) {}

	@Get()
	async findAll(): Promise<TagEntity[]> {
		return await this._charactersService.findAll();
	}
}
