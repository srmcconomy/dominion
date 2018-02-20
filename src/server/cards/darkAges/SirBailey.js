import Card from 'cards/Card';
import KnightAttack from 'utils/KnightAttack';

export default class SirBailey extends Card {
  static cost = new Card.Cost({ coin: 5 });
  static types = new Set(['Action', 'Attack', 'Knight']);
  static supplyCategory = 'nonSupply';
  async onPlay(player, event) {
    await player.draw(1);
    player.actions++;
    await KnightAttack(player, event, this);
  }
}