import Card from 'cards/Card';

export default class Duke extends Card {
  static cost = new Card.Cost({ coin: 5 });
  static types = new Set(['Victory']);
  static getNumberInSupply(game) {
    if (game.players.size === 2) return 8;
    return 12;
  }
  getVpValue(player) {
    return player.deck.filter(c => c.title === 'Duchy').length;
  }
}
