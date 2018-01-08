import Card from 'cards/Card';

export default class Armory extends Card {
  static cost = { coin: 4 };
  static types = new Set(['Action']);
  async onPlay(player) {
    const [supply] = await player.selectSupplies({
      min: 1,
      max: 1,
      predicate: s => (
        s.cards.size > 0 &&
        player.costsLessThanEqualTo(s.cards.last(), { coin: 4 })
      ),
      message: 'Choose an card to gain'
    });
    if (supply) {
      await player.gain(supply.title, player.deck);
    }
  }
}
