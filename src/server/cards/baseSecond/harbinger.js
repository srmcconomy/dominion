import Card from 'cards/Card';

export default class Harbinger extends Card {
  static cost = {coin:3};
  static types = new Set(['Action']);
  async onPlay(player) {
    await player.draw(1);
    player.actions++;
    if (player.discardPile.size > 0) {
      const [card] = await player.selectCards({
        min: 0,
        max: 1,
        pile: player.discardPile,
        message: 'Select a Card from your discard pile'
      });
      if (card) {
        await player.topDeck(card, player.discardPile);
      }
    }
  }
}
