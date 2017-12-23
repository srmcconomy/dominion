import Card from 'cards/Card';

export default class Bridge extends Card {
  static cost = { coin: 4 };
  static types = new Set(['Action']);
  async onPlay(player) {
    player.buys++;
    player.money++;
  }
}
