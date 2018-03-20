import Card from 'cards/Card';

export default class TheMountainsGift extends Card {
  static cost = new Card.Cost({ coin: 0 });
  static types = new Set(['Boon']);
  static supplyCategory = 'nonSupply';
  async effect(player) {
    await player.gain('Silver');
  }
}
