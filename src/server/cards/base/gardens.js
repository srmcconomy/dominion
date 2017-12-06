import Card from 'cards/Card';

export default class Gardens extends Card {
  static cost = 4;
  static types = new Set(['Victory']);
  static getNumberInSupply(game) {
    if (game.players.size === 2) return 8;
    return 12;
  }
  static getVpValue(player) {
    return Math.floor(player.deck.length / 10);
  }
}
