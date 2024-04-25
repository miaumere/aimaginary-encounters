import { Attitude } from '../enums/attitude.enum';

export interface ICharacter {
  name: string;
  age: string;
  pronouns: string;
  backstory: string;
  skills: string[];
  image: string;
  mbti: string;
  positiveTraits: string[];
  negativeTraits: string[];
  quote: string;
  color: string;
  attitude: Attitude;
}

export class Character implements ICharacter {
  name: string;
  age: string;
  pronouns: string;
  backstory: string;
  skills: string[];
  image: string;
  mbti: string;
  positiveTraits: string[];
  negativeTraits: string[];
  quote: string;
  color: string;
  attitude: Attitude;
  constructor(character: ICharacter) {
    this.name = character.name;
    this.age = character.age;
    this.pronouns = character.pronouns;
    this.backstory = character.backstory;
    this.skills = character.skills;
    this.image = character.image;
    this.mbti = character.mbti;
    this.positiveTraits = character.positiveTraits;
    this.negativeTraits = character.negativeTraits;
    this.quote = character.quote;
    this.color = character.color;
    this.attitude = character.attitude;
  }
}
