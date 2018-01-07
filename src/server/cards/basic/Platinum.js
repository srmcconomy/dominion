import Card from 'cards/Card';

export default class Platinum extends Card {
  static value = 5;
  static cost = new Card.Cost({ coin: 9 });
  static types = new Set(['Treasure']);
  static supplyCategory = 'treasure';
  static getNumberInSupply() {
    return 12;
  }
  onPlay(player) {
    player.money += 5;
  }
}
