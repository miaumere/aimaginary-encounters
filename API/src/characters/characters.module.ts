import { CharacterEntity } from './../entities/character.entity';
import { Module, NestModule } from '@nestjs/common';
import { CharactersService } from './characters.service';
import { CharactersController } from './characters.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
	imports: [TypeOrmModule.forFeature([CharacterEntity])],
	providers: [CharactersService],
	controllers: [CharactersController],
	exports: [],
})
export class CharactersModule implements NestModule {
	public configure() {}
}
