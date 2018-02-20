import Card from 'cards/Card';
import KnightAttack from 'utils/KnightAttack';

export default class SirMartin extends Card {
  static cost = new Card.Cost({ coin: 4 });
  static types = new Set(['Action', 'Attack', 'Knight']);
  static supplyCategory = 'nonSupply';
  async onPlay(player, event) {
    player.buys += 2;
    await KnightAttack(player, event, this);
  }
}
