import Card from 'cards/Card';

export default class Armory extends Card {
  static cost = new Card.Cost({ coin: 4 });
  static types = new Set(['Action']);
  async onPlay(player) {
    const [supply] = await player.selectSupplies({
      min: 1,
      max: 1,
      predicate: s => (s.cards.length > 0 ? (
        player.cardCostsLessThanEqualTo(s.cards.last(), { coin: 4 })
      ) : false),
      message: 'Choose an card to gain'
    });
    if (supply) {
      await player.gain(supply.title, player.deck);
    }
  }
}
