import Card from '../card';
import { Set } from 'immutable';

export default class Estate extends Card {
  name = 'Estate';
  VP = 1;
  cost = 2;
  types = new Set(['Victory']);
}
