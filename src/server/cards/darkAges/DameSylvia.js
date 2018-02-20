import Card from 'cards/Card';
import KnightAttack from 'utils/KnightAttack';

export default class DameSylvia extends Card {
  static cost = new Card.Cost({ coin: 5 });
  static types = new Set(['Action', 'Attack', 'Knight']);
  static supplyCategory = 'nonSupply';
  async onPlay(player, event) {
    player.money += 2;
    await KnightAttack(player, event, this);
  }
}
