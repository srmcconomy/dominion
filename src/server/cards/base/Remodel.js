import Card from 'cards/Card';

export default class Remodel extends Card {
  static cost = new Card.Cost({ coin: 4 });
  static types = new Set(['Action']);
  async onPlay(player) {
    const [card] = await player.selectCards({ min: 1, max: 1, message: 'Choose a Card to Remodel' });
    if (card) {
      await player.trash(card);
      const [supply] = await player.selectSupplies({
        min: 1,
        max: 1,
        predicate: async s => (s.cards.length > 0 ? (
          player.cardCostsLessThanEqualTo(s.cards.last(), (await player.getCardCost(card)).add({ coin: 2 }))
        ) : false),
        message: 'Choose an card to gain'
      });
      if (supply) {
        await player.gain(supply.title);
      }
    }
  }
}
