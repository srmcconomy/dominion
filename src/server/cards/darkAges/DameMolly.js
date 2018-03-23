import Card from 'cards/Card';
import KnightAttack from 'utils/KnightAttack';

export default class DameMolly extends Card {
  name = 'Dame Molly';
  static cost = new Card.Cost({ coin: 5 });
  static types = new Set(['Action', 'Attack', 'Knight']);
  static supplyCategory = 'nonSupply';
  async onPlay(player, event) {
    player.actions += 2;
    await KnightAttack(player, event, this);
  }
}
