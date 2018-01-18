import Card from 'cards/Card';

export default class RuinedMarket extends Card {
  static cost = { coin: 0 };
  static types = new Set(['Action', 'Ruins']);
  static supplyCategory = 'nonSupply';
  async onPlay(player) {
    player.buys++;
  }
}
