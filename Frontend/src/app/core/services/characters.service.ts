import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { ICharacterDto } from './models/character-dto.model';
import { ICharacterRequestDto } from './models/character-request-dto.model';

@Injectable({
  providedIn: 'root',
})
export class CharactersService {
  private _baseUrl = '/api/characters';

  constructor(private http: HttpClient) {}

  getCharacters() {
    return this.http.get<ICharacterDto[]>(`${this._baseUrl}`);
  }

  upsertCharacter(character: ICharacterRequestDto) {
    const formData = new FormData();
    Object.entries(character).forEach(([key, value]) => {
      formData.append(key, '' + value);
    });

    return this.http.post<ICharacterRequestDto>(`${this._baseUrl}`, character);
  }
}
