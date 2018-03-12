import Card from 'cards/Card';

export default class Gardens extends Card {
  static cost = new Card.Cost({ coin: 4 });
  static types = new Set(['Victory']);
  getVpValue(player) {
    return Math.floor(player.deck.length / 10);
  }
}
