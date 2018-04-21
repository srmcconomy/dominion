import Card from 'cards/Card';
import KnightAttack from 'utils/KnightAttack';

export default class DameAnna extends Card {
  name = 'Dame Anna';
  static cost = new Card.Cost({ coin: 5 });
  static types = new Set(['Action', 'Attack', 'Knight']);
  static supplyCategory = 'nonSupply';
  async onPlay(player, event) {
    const cards = await player.selectCards({
      min: 0,
      max: 2,
      message: 'Choose up to 2 cards to trash'
    });
    for (let i = 0; i < cards.length; i++) {
      await player.trash(cards[i]);
    }
    await KnightAttack(player, event, this);
  }
}
