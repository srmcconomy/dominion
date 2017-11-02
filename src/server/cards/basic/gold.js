import Card from 'cards/Card';
import { Set } from 'immutable';

export default class Gold extends Card {
  static title = 'Gold';
  static value = 3;
  static cost = 6;
  static types = new Set(['Treasure']);
  static supplyCategory = 'treasure';
  static getNumberInSupply(game) {
    return 30;
  }
}
