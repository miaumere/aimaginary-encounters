import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../../../core/base.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { colors } from '../../../../../shared/colors';
import { CharactersService } from '../../../../../../core/services/characters.service';
import { ICharacterRequestDto } from '../../../../../../core/services/models/character-request-dto.model';

@Component({
  selector: 'app-edit-character-details',
  templateUrl: './edit-character-details.component.html',
  styleUrl: './edit-character-details.component.scss',
})
export class EditCharacterDetailsComponent
  extends BaseComponent
  implements OnInit
{
  readonly colors = colors;
  characterId: string = '';
  editMode = false;

  chosenColor: string = colors[0];

  form = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
    ]),
    age: new FormControl('', [Validators.required, Validators.maxLength(3)]),
    backstory: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(250),
    ]),
    positiveTraits: new FormControl('', [Validators.maxLength(50)]),
    negativeTraits: new FormControl('', [Validators.maxLength(50)]),
    skills: new FormControl('', [Validators.maxLength(50)]),
  });

  selectedFile: File | null = null;
  imagePreview: string | null = null;

  constructor(
    private _route: ActivatedRoute,
    private _charactersService: CharactersService
  ) {
    super();
    this.characterId = this._route.snapshot.params['id'];
    this.editMode = !!this.characterId;
  }

  ngOnInit(): void {}

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.selectedFile = file;
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          this.imagePreview = e.target?.result as string;
        }
      };
      reader.readAsDataURL(file);
    }
  }

  saveChanges() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const request: ICharacterRequestDto = {
      name: this.form.value.name ?? '',
      age: this.form.value.age ?? '',
      backstory: this.form.value.backstory ?? '',
      positiveTraits: this.form.value.positiveTraits ?? '',
      negativeTraits: this.form.value.negativeTraits ?? '',
      skills: this.form.value.skills ?? '',
      color: this.chosenColor,
      image: this.selectedFile as File,
    };

    console.log('Request:', request);

    this.subscriptions$.add(
      this._charactersService
        .upsertCharacter(request)
        .subscribe((character) => {
          console.log('character: ', character);
        })
    );
  }
}
