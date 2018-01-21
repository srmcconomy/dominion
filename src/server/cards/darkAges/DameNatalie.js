import Card from 'cards/Card';
import KnightAttack from 'cards/darkAges/KnightAttack';

export default class DameNatalie extends Card {
  static cost = { coin: 5 };
  static types = new Set(['Action', 'Attack', 'Knight']);
  // static supplyCategory = 'nonSupply';
  async onPlay(player, event) {
    const [supply] = await player.selectSupplies({
      min: 0,
      max: 1,
      predicate: s => (
        s.cards.size > 0 &&
        player.costsLessThanEqualTo(s.cards.last(), { coin: 3 })
      ),
      message: 'Choose an card to gain'
    });
    if (supply) {
      await player.gain(supply.title);
    }

    await KnightAttack(player, event, this);
  }
}
