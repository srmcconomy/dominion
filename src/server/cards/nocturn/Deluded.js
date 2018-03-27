import Card from 'cards/Card';

export default class Deluded extends Card {
  static cost = new Card.Cost({ coin: 0 });
  static types = new Set(['State']);
  static supplyCategory = 'nonSupply';

  willTriggerOn(event, player) {
    return event.name === 'start-of-buy-phase' &&
    event.triggeringPlayer === player &&
    player.states.includes(this);
  }

  async onTrigger(event, player) {

  }
}
