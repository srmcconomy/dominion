import Card from 'cards/Card';
import KnightAttack from 'cards/darkAges/KnightAttack';

export default class DameMolly extends Card {
  static cost = { coin: 5 };
  static types = new Set(['Action', 'Attack', 'Knight']);
  // static supplyCategory = 'nonSupply';
  async onPlay(player, event) {
    player.actions += 2;
    await KnightAttack(player, event, this);
  }
}
