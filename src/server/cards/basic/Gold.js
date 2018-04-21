import Card from 'cards/Card';

export default class Gold extends Card {
  static value = 3;
  static cost = new Card.Cost({ coin: 6 });
  static types = new Set(['Treasure']);
  static supplyCategory = 'treasure';
  onPlay(player) {
    player.money += 3;
  }
}
