import Card from 'cards/Card';

export default class TheWindsGift extends Card {
  name = 'The Wind\'s Gift';
  static cost = new Card.Cost({ coin: 0 });
  static types = new Set(['Boon']);
  static supplyCategory = 'nonSupply';
  async effect(player) {
    await player.draw(2);
    const cards = await player.selectCards({
      min: 2,
      max: 2,
      message: 'Select 2 cards to discard'
    });
    await player.discardAll([...cards]);
  }
}
