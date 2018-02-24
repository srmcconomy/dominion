import EventCard from 'eventCards/EventCard';
import Card from 'cards/Card';

export default class Bonfire extends EventCard {
  cost = new Card.Cost({ coin: 2 });
  async onEventBuy(player) {
    const cards = await player.selectCards({
      min: 0,
      max: 2,
      pile: player.playArea,
      message: 'Choose up to two cards to trash',
    });
    for (const card of cards) {
      await player.trash(card, player.playArea);
    }
  }
}
