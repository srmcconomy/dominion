import Card from 'cards/Card';
import KnightAttack from 'utils/KnightAttack';

export default class DameNatalie extends Card {
  name = 'Dame Natalie';
  static cost = new Card.Cost({ coin: 5 });
  static types = new Set(['Action', 'Attack', 'Knight']);
  static supplyCategory = 'nonSupply';
  async onPlay(player, event) {
    const [supply] = await player.selectSupplies({
      min: 0,
      max: 1,
      predicate: s => (
        s.cards.size > 0 &&
        player.cardCostsLessThanEqualTo(s.cards.last(), { coin: 3 })
      ),
      message: 'Choose an card to gain'
    });
    if (supply) {
      await player.gain(supply.title);
    }

    await KnightAttack(player, event, this);
  }
}
