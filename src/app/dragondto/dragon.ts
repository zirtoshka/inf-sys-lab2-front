import {Coordinates} from './coordinates';
import {DragonCave} from './dragoncave';
import {Person} from './person';
import {Color} from './color';
import {DragonCharacter} from './dragoncharacter';

export interface Dragon {
  id: number;
  name: string;
  coordinates: Coordinates;
  creationDate: string;
  cave: DragonCave;
  killer: Person | null;
  age: number | null;
  wingspan: number | null;
  color: Color;
  character: DragonCharacter
}
