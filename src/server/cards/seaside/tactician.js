import Card from 'cards/Card';

export default class Tactician extends Card {
  static cost = { coin: 5 };
  static types = new Set(['Action', 'Duration']);
  async onPlay(player) {
    if (player.hand.size) {
      while (player.hand.size) {
        await player.discard(player.hand.list[0]);
      }
    } else {
      player.durationComplete(this);
    }
  }
  async onTurnStart(player) {
    await player.draw(5);
    player.actions++;
    player.buys++;
    player.durationComplete(this);
  }
}
