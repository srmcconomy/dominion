import Card from 'cards/Card';

export default class Laboratory extends Card {
  static cost = 5;
  static types = new Set(['Action']);
  async onPlay(player) {
    await player.draw(2);
    player.actions++;
  }
}
