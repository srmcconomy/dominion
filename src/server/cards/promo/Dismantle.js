import Card from 'cards/Card';

export default class Dismantle extends Card {
  static cost = new Card.Cost({ coin: 4 });
  static types = new Set(['Action']);
  async onPlay(player) {
    const [card] = await player.selectCards({
      min: 1,
      max: 1,
      message: 'Choose a card to trash'
    });

    await player.trash(card);

    if (await player.cardCostsGreaterThanEqualTo(card, { coin: 1 })) {
      const [supply] = await player.selectSupplies({
        min: 1,
        max: 1,
        predicate: s => (s.cards.length > 0 ? (
          player.cardCostsLessThanEqualTo(s.cards.last(), card)
        ) : false),
        message: 'Choose an card to gain'
      });
      if (supply) {
        await player.gain(supply.title);
      }
      await player.gain('Gold');
    }
  }
}
