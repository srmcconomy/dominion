import Card from 'cards/Card';

export default class Warehouse extends Card {
  static cost = { coin: 3 };
  static types = new Set(['Action']);
  async onPlay(player) {
    await player.draw(3);
    player.actions++;
    const cards = await player.selectCards({ min: 3, max: 3, message: 'Discard three cards' });
    for (let i = 0; i < cards.length; i++) {
      await player.discard(cards[i]);
    }
  }
}
