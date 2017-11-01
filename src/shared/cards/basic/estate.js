import Card from 'cards/Card';
import { Set } from 'immutable';

export default class Estate extends Card {
  static title = 'Estate';
  static VP = 1;
  static cost = 2;
  static types = new Set(['Victory']);
  static supplyCategory = 'victory';
  static getNumberInSupply(game) {
    if (game.players.size > 4) return 15;
    if (game.players.size === 2) return 8;
    return 12;
  }
}
