import Card from 'cards/Card';
import KnightAttack from 'cards/darkAges/KnightAttack';

export default class SirMartin extends Card {
  static cost = { coin: 4 };
  static types = new Set(['Action', 'Attack', 'Knight']);
  // static supplyCategory = 'nonSupply';
  async onPlay(player, event) {
    player.buys += 2;
    await KnightAttack(player, event, this);
  }
}
