import Card from 'cards/Card';

export default class Poverty extends Card {
  static cost = new Card.Cost({ coin: 0 });
  static types = new Set(['Hex']);
  static supplyCategory = 'nonSupply';
  async effect(player) {
    if (player.hand.length > 3) {
      const cards = await player.selectCards({
        min: player.hand.length - 3,
        max: player.hand.length - 3,
        message: 'Select cards to discard'
      });
      await player.discardAll([...cards]);
    }
  }
}
