import Card from 'cards/Card';

export default class University extends Card {
  static cost = new Card.Cost({ coin: 2, potion: 1 });
  static types = new Set(['Action']);
  async onPlay(player) {
    player.actions += 2;
    const [supply] = await player.selectSupplies({
      min: 1,
      max: 1,
      predicate: s => (s.cards.length > 0 ? (
        player.cardCostsLessThanEqualTo(s.cards.last(), { coin: 5 }) &&
        s.cards.last().types.has('Action')
      ) : false),
      message: 'Choose an card to gain'
    });
    if (supply) {
      await player.gain(supply.title);
    }
  }
}
