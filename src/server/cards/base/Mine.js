import Card from 'cards/Card';

export default class Mine extends Card {
  static cost = new Card.Cost({ coin: 5 });
  static types = new Set(['Action']);
  async onPlay(player) {
    const [card] = await player.selectCards({
      min: 0,
      max: 1,
      predicate: c => c.types.has('Treasure'),
      message: 'Choose a Treasure card to trash'
    });
    if (card) {
      await player.trash(card);
      const [supply] = await player.selectSupplies({
        min: 1,
        max: 1,
        predicate: s => (
          s.cards.size > 0 &&
          s.cards.last().cost.isLessThanEqualTo({ coin: card.cost.coin + 3 }) &&
          s.cards.last().types.has('Treasure')
        ),
        message: 'Choose a Treasure card to gain'
      });
      if (supply) {
        await player.gain(supply.title, player.hand);
      }
    }
  }
}
