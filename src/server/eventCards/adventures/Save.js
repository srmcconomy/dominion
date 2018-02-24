import EventCard from 'eventCards/EventCard';
import Card from 'cards/Card';
import Pile from 'utils/Pile';

export default class Save extends EventCard {
  cost = new Card.Cost({ coin: 1 });
  aside = new Pile();
  async onEventBuy(player) {
    player.buys++;
    const [card] = await player.selectCards({
      min: 1,
      max: 1,
      message: 'Choose a card to set aside',
    });

    player.moveCard(card, player.hand, this.aside);
  }

  willTriggerOn(event) {
    return event.name === 'end-of-turn' && this.aside.length > 0;
  }

  async onTrigger(event, player) {
    player.moveCard(this.aside.last(), this.aside, player.hand);
  }
}
