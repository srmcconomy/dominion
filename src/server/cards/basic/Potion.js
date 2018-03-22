import Card from 'cards/Card';

export default class Potion extends Card {
  static cost = new Card.Cost({ coin: 4 });
  static types = new Set(['Treasure']);
  static supplyCategory = 'treasure';
  onPlay(player) {
    player.potion += 1;
  }
}
