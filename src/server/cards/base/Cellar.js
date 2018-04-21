import Card from 'cards/Card';

export default class Cellar extends Card {
  static cost = new Card.Cost({ coin: 2 });
  static types = new Set(['Action']);
  async onPlay(player) {
    player.actions++;
    const cards = await player.selectCards({ min: 0, max: player.hand.size, message: 'Select Cards to discard' });
    await player.discardAll([...cards]);
    await player.draw(cards.length);
  }
}
