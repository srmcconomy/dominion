import EventCard from 'eventCards/EventCard';
import Card from 'cards/Card';

export default class ScoutingParty extends EventCard {
  cost = new Card.Cost({ coin: 2 });
  async onEventBuy(player) {
    player.buys += 2;
    player.addPersistentEffect('gain', this);
  }

  canTriggerOn(event, player, persistent) {
    return persistent;
  }

  async onTrigger(event, player) {
    player.topDeck(event.card, player.discardPile);
    player.removePersistentEffect('gain', this);
  }
}
