import Card from 'cards/Card';

export default class Cellar extends Card {
  static cost = 2;
  static types = new Set(['Action']);
  async onPlay(player) {
    player.actions++;
    const cards = await player.selectCards({ min: 0, max: player.hand.size, message: 'Select Cards to discard'});
    cards.forEach(async card => await player.discard(card));
    await player.draw(cards.length);
  }
}
