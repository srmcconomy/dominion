import Card from 'cards/Card';

export default class Wish extends Card {
  static cost = new Card.Cost({ coin: 0 });
  static types = new Set(['Action']);
  static supplyCategory = 'nonSupply';
  async onPlay(player) {
    player.actions++;
    if (player.playArea.includes(this)) {
      player.returnToSupply(this, player.playArea);
      const [supply] = await player.selectSupplies({
        min: 1,
        max: 1,
        predicate: s => (s.cards.length > 0 ? (
          player.cardCostsLessThanEqualTo(s.cards.last(), { coin: 6 })
        ) : false),
        message: 'Choose an card to gain'
      });
      if (supply) {
        await player.gain(supply.title, player.hand);
      }
    }
  }
}
