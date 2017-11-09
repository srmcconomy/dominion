import Card from 'cards/Card';

export default class Festival extends Card {
  static cost = 5;
  static types = new Set(['Action']);
  async onPlay(player) {
    player.actions += 2;
    player.buys++;
    player.money += 2;
  }
}
