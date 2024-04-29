import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICharacterDto } from '../../../../core/services/models/character-dto.model';
import { BaseComponent } from '../../../../core/base.component';
import { CharactersService } from '../../../../core/services/characters.service';

@Component({
  selector: 'app-character-card [character]',
  templateUrl: './character-card.component.html',
  styleUrl: './character-card.component.scss',
})
export class CharacterCardComponent extends BaseComponent {
  @Input() character: ICharacterDto = {
    id: '',
    name: 'Character 1',
    image: 'https://via.placeholder.com/150',
  };

  @Output() changed = new EventEmitter<null>();

  constructor(private _charactersService: CharactersService) {
    super();
  }

  deleteCharacter() {
    const decision = confirm(
      'Are you sure you want to delete this character? All associated chats and messages will be deleted as well.'
    );

    if (decision) {
      this.subscriptions$.add(
        this._charactersService
          .deleteCharacter(this.character.id)
          .subscribe(() => {
            this.changed.emit();
          })
      );
    }
  }
}
