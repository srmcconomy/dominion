import Card from 'cards/Card';

export default class Princess extends Card {
  static cost = { coin: 0 };
  static types = new Set(['Action', 'Prize']);
  static supplyCategory = 'nonSupply';
  async onPlay(player) {
    player.buys++;
  }
}
