import Card from 'cards/Card';

export default class Estate extends Card {
  static VP = 1;
  static cost = {coin:2};
  static types = new Set(['Victory']);
  static supplyCategory = 'victory';
  static getNumberInSupply(game) {
    if (game.players.size > 4) return 15;
    if (game.players.size === 2) return 8;
    return 12;
  }
}
