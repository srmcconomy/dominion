import Card from 'cards/Card';

export default class CouncilRoom extends Card {
  static cost = 5;
  static types = new Set(['Action']);
  async onPlay(player) {
    await player.draw(4);
    player.buys++;
    await player.forEachOtherPlayer(async other => await other.draw(1));
  }
}
