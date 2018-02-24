import EventCard from 'eventCards/EventCard';
import Card from 'cards/Card';

export default class Expedition extends EventCard {
  cost = new Card.Cost({ coin: 3 });

  async onEventBuy(player) {
    const [supply] = await player.selectSupplies({
      min: 1,
      max: 1,
      predicate: s => s.types.has('Action'),
      message: 'Choose a supply to put your -2 cost token on'
    });
    if (supply) {
      player.minusCostTokenSupply = supply;
    }
  }

  async eventSetup(game) {
    game.playerOrder.forEach(player => player.addPersistentEffect('card-cost', this));
  }

  willTriggerOn(event, player, persistent) {
    return persistent && player.minusCostTokenSupply === event.card.supply;
  }

  async onTrigger(event) {
    event.costModifiers.push(cost => {
      cost = cost.subtract({ coin: 2 });
      if (cost.coin < 0) {
        cost.coin = 0;
      }
      return cost;
    });
  }
}
