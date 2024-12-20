import {Coordinates} from './coordinates';
import {DragonCave} from './dragoncave';
import {Person} from './person';
import {Color} from './color';
import {DragonCharacter} from './dragoncharacter';
import {DragonHead} from './dragonhead';

export interface Dragon {
  id: number;
  name: string;
  coordinates: Coordinates | null;
  coordinatesId: number | undefined;
  creationDate: string;
  cave: DragonCave | null;
  caveId: number | undefined;
  killer: Person | null;
  killerId: number | undefined;
  age: number | null;
  wingspan: number | null;
  color: Color;
  character: DragonCharacter;
  heads: DragonHead[]|null;
  headIds: number[]|undefined;
  canEdit: boolean
}
