import Card from 'cards/Card';

export default class Merchant extends Card {
  static cost = {coin:3};
  static types = new Set(['Action']);
  async onPlay(player) {
    await player.draw(1);
    player.actions++;
  }
}
