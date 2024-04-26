import { Component, Input } from '@angular/core';
import { ICharacterDto } from '../../../../core/services/models/character-dto.model';

@Component({
  selector: 'app-character-card [character]',
  templateUrl: './character-card.component.html',
  styleUrl: './character-card.component.scss',
})
export class CharacterCardComponent {
  @Input() character: ICharacterDto = {
    id: '',
    name: 'Character 1',
    image: 'https://via.placeholder.com/150',
  };
}
