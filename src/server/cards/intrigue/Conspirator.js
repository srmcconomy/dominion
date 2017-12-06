import Card from 'cards/Card';

export default class Conspirator extends Card {
  static cost = {coin:4};
  static types = new Set(['Action']);
  async onPlay(player) {
    player.money += 2;
    if (player.actionsPlayedThisTurn >= 3) {
      await player.draw(1);
      player.actions++;
    }
  }
}
