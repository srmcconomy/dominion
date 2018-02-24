import EventCard from 'eventCards/EventCard';
import Card from 'cards/Card';

export default class Borrow extends EventCard {
  cost = new Card.Cost({ coin: 0 });
  async onEventBuy(player) {
    player.buys++;
    if (!player.hasMinusCardToken) {
      player.takeMinusCardToken();
      player.money++;
    }
  }
}
