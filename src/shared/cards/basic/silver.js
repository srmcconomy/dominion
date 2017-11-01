import Card from 'cards/Card';
import { Set } from 'immutable';

export default class Silver extends Card {
  static title = 'Silver';
  static value = 2;
  static cost = 3;
  static types = new Set(['Treasure']);
  static supplyCategory = 'treasure';
  static getNumberInSupply(game) {
    return 40;
  }
}
