import Card from 'cards/Card';

export default class Colony extends Card {
  static VP = 10;
  static cost = new Card.Cost({ coin: 11 });
  static types = new Set(['Victory']);
  static supplyCategory = 'victory';
  static getNumberInSupply(game) {
    if (game.players.size === 2) return 8;
    return 12;
  }
}
