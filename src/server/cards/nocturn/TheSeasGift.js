import Card from 'cards/Card';

export default class TheSeasGift extends Card {
  name = 'The Sea\'s Gift';
  static cost = new Card.Cost({ coin: 0 });
  static types = new Set(['Boon']);
  static supplyCategory = 'nonSupply';
  async effect(player) {
    await player.draw(1);
  }
}
