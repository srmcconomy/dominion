import Card from 'cards/Card';

export default class Silver extends Card {
  static value = 2;
  static cost = new Card.Cost({ coin: 3 });
  static types = new Set(['Treasure']);
  static supplyCategory = 'treasure';
  onPlay(player) {
    player.money += 2;
  }
}
