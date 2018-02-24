import EventCard from 'eventCards/EventCard';
import Card from 'cards/Card';

export default class Expedition extends EventCard {
  cost = new Card.Cost({ coin: 3 });

  async onEventBuy(player) {
    player.addPersistentEffect('end-of-turn', this);
  }

  willTriggerOn(event, player, persistent) {
    return persistent;
  }

  async onTrigger(event, player) {
    await player.draw(2);
    player.removePersistentEffect('end-of-turn', this);
  }
}
