import Card from 'cards/Card';

export default class Avanto extends Card {
  static cost = new Card.Cost({ coin: 5 });
  static types = new Set(['Action']);
  async onPlay(player) {
    await player.draw(3);
    const [card] = await player.selectCards({
      min: 0,
      max: 1,
      predicate: c => c.title === 'Sauna',
      message: 'Select a Sauna to play'
    });
    if (card) await player.play(card);
  }
}
