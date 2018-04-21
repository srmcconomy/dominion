import Card from 'cards/Card';

export default class Artisan extends Card {
  static cost = new Card.Cost({ coin: 6 });
  static types = new Set(['Action']);
  async onPlay(player) {
    const [supply] = await player.selectSupplies({
      min: 1,
      max: 1,
      predicate: s => (s.cards.length > 0 ? (
        player.cardCostsLessThanEqualTo(s.cards.last(), { coin: 5 })
      ) : false),
      message: 'Choose an card to gain'
    });
    if (supply) {
      await player.gain(supply.title, player.hand);
    }
    const [card] = await player.selectCards({ min: 1, max: 1, message: 'Choose a card to put on top of your deck' });
    if (card) {
      await player.topDeck(card);
    }
  }
}
