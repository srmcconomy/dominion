import Card from 'cards/Card';
import { Set } from 'immutable';

export default class Province extends Card {
  static title = 'Province';
  static VP = 6;
  static cost = 8;
  static types = new Set(['Victory']);
  static supplyCategory = 'victory';
  static getNumberInSupply(game) {
    if (game.players.size > 4) return 15;
    if (game.players.size === 2) return 8;
    return 12;
  }
}
