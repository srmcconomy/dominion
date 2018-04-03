import Card from 'cards/Card';

export default class DevilsWorkshop extends Card {
  name = 'Devil\'s Workshop';
  static cost = new Card.Cost({ coin: 4 });
  static types = new Set(['Night']);
  async onPlay(player) {
    if (player.cardsGainedThisTurn.length === 0) {
      await player.gain('Gold');
    } else if (player.cardsGainedThisTurn.length === 1) {
      const [supply] = await player.selectSupplies({
        min: 1,
        max: 1,
        predicate: s => (s.cards.length > 0 ? (
          player.cardCostsLessThanEqualTo(s.cards.last(), { coin: 4 })
        ) : false),
        message: 'Choose an card to gain'
      });
      if (supply) {
        await player.gain(supply.title);
      }
    } else {
      await player.gain('Imp');
    }
  }
}
