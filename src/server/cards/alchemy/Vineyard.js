import Card from 'cards/Card';

export default class Vineyard extends Card {
  static cost = new Card.Cost({ potion: 1 });
  static types = new Set(['Victory']);
  getVpValue(player) {
    return Math.floor(player.cardsOwned.filter(c => c.types.has('Action')).length / 3);
  }
}
