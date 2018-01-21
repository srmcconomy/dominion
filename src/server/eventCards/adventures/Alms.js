import EventCard from 'eventCards/EventCard';
import Card from 'cards/Card';

export default class Alms extends EventCard {
  cost = new Card.Cost({ coin: 0 });
  async onEventBuy(player) {
    if (!player.playArea.some(c => c.types.has('Treasure'))) {
      const [supply] = await player.selectSupplies({
        min: 1,
        max: 1,
        predicate: s => (
          s.cards.size > 0 &&
          player.cardCostsLessThanEqualTo(s.cards.last(), { coin: 4 })
        ),
        message: 'Choose an card to gain'
      });
      if (supply) {
        await player.gain(supply.title);
      }
    }
  }
}
