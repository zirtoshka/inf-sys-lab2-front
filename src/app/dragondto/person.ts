import {Color} from './color';
import {Country} from './country';
import {Location} from './location';

export interface Person {
  id: number;
  name: string;
  eyeColor: Color;
  hairColor: Color;
  location: Location | null;
  locationId: number | undefined;
  height: number | null;
  passportID: string;
  nationality: Country
  canEdit: boolean
}
