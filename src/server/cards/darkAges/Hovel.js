import Card from 'cards/Card';

export default class Hovel extends Card {
  static cost = new Card.Cost({ coin: 1 });
  static types = new Set(['Reaction', 'Shelter']);
  static supplyCategory = 'nonSupply';

  canTriggerOn(event, player) {
    return event.name === 'buy' && player === event.triggeringPlayer && event.card.types.has('Victory') && player.hand.includes(this);
  }

  async onTrigger(event, player) {
    await player.trash(this);
  }
}
