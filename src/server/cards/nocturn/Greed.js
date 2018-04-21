import Card from 'cards/Card';

export default class Greed extends Card {
  static cost = new Card.Cost({ coin: 0 });
  static types = new Set(['Hex']);
  static supplyCategory = 'nonSupply';
  async effect(player) {
    await player.gain('Copper', player.deck);
  }
}
