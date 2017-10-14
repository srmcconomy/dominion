import Card from '../card';
import { Set } from 'immutable';

export default class Copper extends Card {
  name = 'Copper';
  value = 1;
  cost = 0;
  types = new Set(['Treasure']);
}
