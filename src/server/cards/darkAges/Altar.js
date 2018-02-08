import Card from 'cards/Card';

export default class Altar extends Card {
  static cost = { coin: 6 };
  static types = new Set(['Action']);
  async onPlay(player) {
    const [card] = await player.selectCards({
      min: 1,
      max: 1,
      message: 'Choose a Card to Trash'
    });
    if (card) {
      await player.trash(card);
    }
    const [supply] = await player.selectSupplies({
      min: 1,
      max: 1,
      predicate: s => (
        s.cards.size > 0 &&
          player.costsLessThanEqualTo(s.cards.last(), { coin: 5 })
      ),
      message: 'Choose an card to gain'
    });
    if (supply) {
      await player.gain(supply.title);
    }
  }
}
