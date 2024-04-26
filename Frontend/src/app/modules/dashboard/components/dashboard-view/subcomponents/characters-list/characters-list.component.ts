import { Component, OnInit } from '@angular/core';
import { ICharacterDto } from '../../../../../../core/services/models/character-dto.model';
import { BaseComponent } from '../../../../../../core/base.component';
import { CharactersService } from '../../../../../../core/services/characters.service';

@Component({
  selector: 'app-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: [
    '../../dashboard-view.component.scss',
    './characters-list.component.scss',
  ],
})
export class CharactersListComponent extends BaseComponent implements OnInit {
  characters: ICharacterDto[] = [];

  constructor(private _charactersService: CharactersService) {
    super();
  }

  ngOnInit(): void {
    this._getCharacters();
  }

  private _getCharacters() {
    this.subscriptions$.add(
      this._charactersService.getCharacters().subscribe((characters) => {
        this.characters = characters;
      })
    );
  }
}
