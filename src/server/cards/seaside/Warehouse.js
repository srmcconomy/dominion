import Card from 'cards/Card';

export default class Warehouse extends Card {
  static cost = new Card.Cost({ coin: 3 });
  static types = new Set(['Action']);
  async onPlay(player) {
    await player.draw(3);
    player.actions++;
    const cards = await player.selectCards({
      min: 3,
      max: 3,
      message: 'Discard three cards'
    });
    await player.discardAll([...cards]);
  }
}
