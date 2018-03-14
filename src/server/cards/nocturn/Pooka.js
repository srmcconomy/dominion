import Card from 'cards/Card';

export default class Pooka extends Card {
  static cost = new Card.Cost({ coin: 5 });
  static types = new Set(['Action']);
  async onPlay(player) {
    const [card] = await player.selectCards({
      min: 0,
      max: 1,
      predicated: c => (c.types.has('Treasure') && (c.title !== 'CursedGold')),
      message: 'Select a treasure to trash'
    });

    if (card) {
      await player.trash(card);
      await player.draw(4);
    }
  }
}
