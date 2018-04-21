import Card from 'cards/Card';

export default class RuinedMarket extends Card {
  name = 'Ruined Market';
  static cost = new Card.Cost({ coin: 0 });
  static types = new Set(['Action', 'Ruins']);
  static supplyCategory = 'nonSupply';
  async onPlay(player) {
    player.buys++;
  }
}
