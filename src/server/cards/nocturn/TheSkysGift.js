import Card from 'cards/Card';

export default class TheSkysGift extends Card {
  name = 'The Sky\'s Gift';
  static cost = new Card.Cost({ coin: 0 });
  static types = new Set(['Boon']);
  static supplyCategory = 'nonSupply';
  async effect(player) {
    const choice = await player.selectOption(['Discard 3 cards', 'Don\'t']);
    if (choice === 0) {
      const cards = await player.selectCards({
        min: 3,
        max: 3,
        message: 'Select 3 cards to discard'
      });
      await player.discardAll([...cards]);
      if (cards.length === 3) {
        await player.gain('Gold');
      }
    }
  }
}
