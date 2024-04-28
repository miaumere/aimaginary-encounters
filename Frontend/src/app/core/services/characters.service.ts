import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICharacterDetails, ICharacterDto } from './models/character-dto.model';
import { ICharacterRequestDto } from './models/character-request-dto.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CharactersService {
  private _baseUrl = '/api/characters';

  constructor(private http: HttpClient) {}

  getCharacters() {
    return this.http.get<ICharacterDto[]>(`${this._baseUrl}`);
  }

  getCharacter(id: string): Observable<ICharacterDetails> {
    return this.http.get<ICharacterDetails>(`${this._baseUrl}/${id}`);
  }

  upsertCharacter(character: ICharacterRequestDto) {
    const formData = new FormData();
    Object.entries(character).forEach(([key, value]) => {
      formData.append(key, value);
    });
    return this.http.post<ICharacterRequestDto>(`${this._baseUrl}`, formData);
  }

  deleteCharacter(id: string) {
    return this.http.delete(`${this._baseUrl}/${id}`);
  }
}
