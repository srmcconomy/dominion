import Card from 'cards/Card';
import KnightAttack from 'cards/darkAges/KnightAttack';

export default class DameJosephine extends Card {
  static VP = 2;
  static cost = { coin: 5 };
  static types = new Set(['Action', 'Attack', 'Knight', 'Victory']);
  // static supplyCategory = 'nonSupply';
  async onPlay(player, event) {
    await KnightAttack(player, event, this);
  }
}
