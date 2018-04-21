import Card from 'cards/Card';

export default class Pouch extends Card {
  static cost = new Card.Cost({ coin: 2 });
  static types = new Set(['Treasure', 'Heirloom']);
  static supplyCategory = 'nonSupply';
  async onPlay(player) {
    player.money++;
    player.buys++;
  }
}
