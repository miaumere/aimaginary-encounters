import { Component } from '@angular/core';
import { ICharacterDto } from '../../../../../../core/services/models/character-in-chat.model';

@Component({
  selector: 'app-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: [
    '../../dashboard-view.component.scss',
    './characters-list.component.scss',
  ],
})
export class CharactersListComponent {
  characters: ICharacterDto[] = [
    {
      id: '1',
      name: 'Character 1',
      imageUrl: 'https://via.placeholder.com/150',
    },
    {
      id: '2',
      name: 'Character 2',
      imageUrl: 'https://via.placeholder.com/150',
    },
    {
      id: '3',
      name: 'Character 3',
      imageUrl: 'https://via.placeholder.com/150',
    },
  ];
  constructor() {}
}
