import Card from 'cards/Card';

export default class AbandonedMine extends Card {
  name = 'Abandoned Mine';
  static cost = new Card.Cost({ coin: 0 });
  static types = new Set(['Action', 'Ruins']);
  static supplyCategory = 'nonSupply';
  async onPlay(player) {
    player.money++;
  }
}
