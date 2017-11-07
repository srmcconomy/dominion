import Card from 'cards/Card';

export default class Duchy extends Card {
  static VP = 3;
  static cost = 5;
  static types = new Set(['Victory']);
  static supplyCategory = 'victory';
  static getNumberInSupply(game) {
    if (game.players.size > 4) return 15;
    if (game.players.size === 2) return 8;
    return 12;
  }
}
