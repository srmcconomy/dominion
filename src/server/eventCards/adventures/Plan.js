import EventCard from 'eventCards/EventCard';
import Card from 'cards/Card';

export default class Expedition extends EventCard {
  cost = new Card.Cost({ coin: 3 });

  async onEventBuy(player) {
    const [supply] = await player.selectSupplies({
      min: 1,
      max: 1,
      predicate: s => s.types.has('Action'),
      message: 'Choose a supply to put your trashing token on'
    });
    if (supply) {
      player.trashingTokenSupply = supply;
    }
  }

  async eventSetup(game) {
    game.playerOrder.forEach(player => player.addPersistentEffect('buy', this));
  }

  canTriggerOn(event, player, persistent) {
    return persistent && player.trashingTokenSupply === event.card.supply;
  }

  async onTrigger(event, player) {
    const [card] = await player.selectCards({
      min: 0,
      max: 1,
      message: 'Choose a card to trash',
    });
    if (card) {
      await player.trash(card);
    }
  }
}
