import { Component, Input } from '@angular/core';
import { ICharacterDto } from '../../../../core/services/models/character-in-chat.model';

@Component({
  selector: 'app-character-card [character]',
  templateUrl: './character-card.component.html',
  styleUrl: './character-card.component.scss',
})
export class CharacterCardComponent {
  @Input() character: ICharacterDto = {
    id: '',
    name: 'Character 1',
    imageUrl: 'https://via.placeholder.com/150',
  };
}
