import Card from 'cards/Card';

export default class Cellar extends Card {
  static cost = { coin: 2 };
  static types = new Set(['Action']);
  async onPlay(player) {
    player.actions++;
    const cards = await player.selectCards({ min: 0, max: player.hand.size, message: 'Select Cards to discard' });
    for (let i = 0; i < cards.length; i++) {
      await player.discard(cards[i]);
    }
    await player.draw(cards.length);
  }
}
