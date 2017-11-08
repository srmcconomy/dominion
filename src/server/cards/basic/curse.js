import Card from 'cards/Card';
import { Set } from 'immutable';

export default class Curse extends Card {
  static cost = 0;
  static types = new Set(['Curse']);
  static supplyCategory = 'treasure';
}
