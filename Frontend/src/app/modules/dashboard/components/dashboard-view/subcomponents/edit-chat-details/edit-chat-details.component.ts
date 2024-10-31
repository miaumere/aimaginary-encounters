import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../../../core/base.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ChatService } from '../../../../../../core/services/chat.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ICharacterDto } from '../../../../../../core/services/models/character-dto.model';
import { CharactersService } from '../../../../../../core/services/characters.service';
import { UserDto } from '../../../../../../core/services/models/user.model';
import {
  Attitude,
  attitudeLabels,
} from '../../../../../../core/services/enums/attitude.enum';
import { IChatRequestDto } from '../../../../../../core/services/models/chat-request.model';

@Component({
  selector: 'app-edit-chat-details',
  templateUrl: './edit-chat-details.component.html',
  styleUrl: './edit-chat-details.component.scss',
})
export class EditChatDetailsComponent extends BaseComponent implements OnInit {
  readonly attitudeLabels = attitudeLabels;
  readonly attitudes = Object.keys(Attitude).filter((item) => {
    return isNaN(Number(item));
  });

  chatId = '';
  form = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
    ]),
    additionalContext: new FormControl('', [Validators.maxLength(250)]),
    character1: new FormControl(null, [Validators.required]),
    character2: new FormControl(null),
  });
  editMode = false;

  characters: ICharacterDto[] = [];
  charactersWithCurrentUser: ICharacterDto[] = [];

  character1Attitude = Attitude[Attitude.Friendly];
  character2Attitude = Attitude[Attitude.Friendly];

  get character1(): ICharacterDto | null {
    return this.form.get('character1')?.value ?? null;
  }

  get character2(): ICharacterDto | null {
    return this.form.get('character2')?.value ?? null;
  }
  constructor(
    private _chatService: ChatService,
    private _charactersService: CharactersService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _toastrService: ToastrService
  ) {
    super();
    this.chatId = this._route.snapshot.params['id'];
    this.editMode = !!this.chatId;
  }
  ngOnInit(): void {
    this._getCharacters();
    if (this.editMode) {
      this._getChat();
    }
  }

  private _getChat() {
    this.subscriptions$.add(
      this._chatService.getChatDetails(this.chatId).subscribe((chat) => {
        this.character1Attitude = Attitude[chat.character1Attitude];
        this.character2Attitude = Attitude[chat.character2Attitude as Attitude];

        this.form.patchValue({
          name: chat.name,
          additionalContext: chat.additionalContext,
          character1: chat.character1 as any,
          character2: chat.character2 as any,
        });
      })
    );
  }

  onCharacterSelected(event: any, formControlName: string) {
    this.form.get(formControlName)?.setValue(event);
  }

  private _getCharacters() {
    this.subscriptions$.add(
      this._charactersService.getCharacters().subscribe((characters) => {
        this.characters = characters;
      })
    );
  }

  saveChanges() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const character1 = this.form.value.character1 as unknown as ICharacterDto;
    const character2 = this.form.value.character2 as unknown as ICharacterDto;

    const request: IChatRequestDto = {
      id: this.chatId,
      name: this.form.value.name ?? '',
      additionalContext: this.form.value.additionalContext ?? null,
      character1Id: character1.id,
      character1Attitude: this.character1Attitude as unknown as Attitude,
      character2Id: character2.id,
      character2Attitude: this.character2Attitude as unknown as Attitude,
    };

    this.subscriptions$.add(
      this._chatService.upsertChat(request).subscribe(() => {
        this.editMode
          ? this._toastrService.success('🎉 Success!')
          : this._router.navigate(['/dashboard']);
      })
    );
  }
}
