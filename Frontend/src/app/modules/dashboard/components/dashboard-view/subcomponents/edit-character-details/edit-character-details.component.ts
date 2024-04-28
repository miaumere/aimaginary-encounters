import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../../../core/base.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { colors } from '../../../../../shared/colors';
import { CharactersService } from '../../../../../../core/services/characters.service';
import { ICharacterRequestDto } from '../../../../../../core/services/models/character-request-dto.model';
import { ToastrService } from 'ngx-toastr';

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
    age: new FormControl('', [Validators.maxLength(50)]),
    gender: new FormControl('', [Validators.maxLength(50)]),
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
    private _charactersService: CharactersService,
    private _router: Router,
    private _toastrService: ToastrService
  ) {
    super();
    this.characterId = this._route.snapshot.params['id'];
    this.editMode = !!this.characterId;
  }

  ngOnInit(): void {
    if (this.editMode) {
      this._getCharacter();
    }
  }

  private _getCharacter(): void {
    this.subscriptions$.add(
      this._charactersService
        .getCharacter(this.characterId)
        .subscribe((character) => {
          this.form.patchValue({
            name: character.name,
            age: character.age,
            backstory: character.backstory,
            positiveTraits: character.positiveTraits,
            negativeTraits: character.negativeTraits,
            skills: character.skills,
          });
          this.chosenColor = character.color;
          this.imagePreview = character.image;
        })
    );
  }

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
      id: this.characterId ?? '',
      name: this.form.value.name ?? '',
      gender: this.form.value.gender ?? '',
      age: this.form.value.age ?? '',
      backstory: this.form.value.backstory ?? '',
      positiveTraits: this.form.value.positiveTraits ?? '',
      negativeTraits: this.form.value.negativeTraits ?? '',
      skills: this.form.value.skills ?? '',
      color: this.chosenColor,
      image: this.selectedFile as File,
    };

    this.subscriptions$.add(
      this._charactersService.upsertCharacter(request).subscribe(() => {
        this._toastrService.success('🎉 Success!');

        if (this.editMode) {
          this._getCharacter();
        } else {
          this._router.navigate(['/dashboard']);
        }
      })
    );
  }
}
