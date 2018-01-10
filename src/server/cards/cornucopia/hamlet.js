import Card from 'cards/Card';

export default class Hamlet extends Card {
  static cost = { coin: 2 };
  static types = new Set(['Action']);
  async onPlay(player) {
    await player.draw(1);
    player.actions++;
    const [card1] = await player.selectCards({
      min: 0,
      max: 1,
      message: 'Select a card to discard for an Action'
    });
    if (card1) {
      await player.discard(card1);
      player.actions++;
    }
    const [card2] = await player.selectCards({
      min: 0,
      max: 1,
      message: 'Select a card to discard for a Buy'
    });
    if (card2) {
      await player.discard(card2);
      player.buys++;
    }
  }
}
