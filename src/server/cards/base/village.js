import Card from 'cards/Card';

export default class Village extends Card {
  static cost = {coin:3};
  static types = new Set(['Action']);
  async onPlay(player) {
    await player.draw(1);
    player.actions += 2;
  }
}
