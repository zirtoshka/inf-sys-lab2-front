import {Color} from './color';
import {Country} from './country';

export interface Person {
  id: number;
  name: string;
  eyeColor: Color;
  hairColor: Color;
  location: Location;
  height: number | null;
  passportID: string;
  nationality: Country
}
