import Card from 'cards/Card';
import { Set } from 'immutable';

export default class Curse extends Card {
  name = 'Curse';
  VP = -1;
  cost = 0;
  types = new Set(['Curse']);
}
