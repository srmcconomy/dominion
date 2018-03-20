import Card from 'cards/Card';

export default class TheEarthsGift extends Card {
  static cost = new Card.Cost({ coin: 0 });
  static types = new Set(['Boon']);
  static supplyCategory = 'nonSupply';
  async effect(player) {
    const [card] = await player.selectCards({
      min: 0,
      max: 1,
      predicate: c => c.types.has('Treasure'),
      message: 'Select a treasure to discard'
    });
    if (card) {
      await player.discard(card);
      const [supply] = await player.selectSupplies({
        min: 1,
        max: 1,
        predicate: s => (
          s.cards.size > 0 &&
        player.cardCostsLessThanEqualTo(s.cards.last(), { coin: 4 })
        ),
        message: 'Choose an card to gain'
      });
      if (supply) {
        await player.gain(supply.title);
      }
    }
  }
}
